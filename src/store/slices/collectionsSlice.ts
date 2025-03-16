import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Collection, CollectionDetails } from "../../types";
import { RootState } from "..";

interface CollectionsState {
  collections: Collection[];
  filteredCollections: Collection[];
  filteredTypes: string[];
  collectionDetails: CollectionDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: CollectionsState = {
  collections: [],
  filteredCollections: [],
  filteredTypes: [],
  collectionDetails: null,
  loading: false,
  error: null,
};

export const fetchCollections = createAsyncThunk("collections/fetchCollections", async () => {
  const response = await axios.get<Collection[]>("/api/collections");
  return response.data;
});

export const fetchCollectionDetails = createAsyncThunk("collections/fetchCollectionDetails", async (id: string) => {
  const response = await axios.get<CollectionDetails>(`/api/collections/${id}`);
  return response.data;
});

const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    setFilterTypes: (state, action: PayloadAction<string[]>) => {
      state.filteredTypes = action.payload;
      state.filteredCollections =
        action.payload.length > 0
          ? state.collections.filter((collection) => action.payload.includes(collection.type))
          : state.collections;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollections.fulfilled, (state, action: PayloadAction<Collection[]>) => {
        state.loading = false;
        state.collections = action.payload;
        state.filteredCollections =
          state.filteredTypes.length > 0
            ? action.payload.filter((collection) => state.filteredTypes.includes(collection.type))
            : action.payload;
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch collections";
      })
      // Fetch collection details
      .addCase(fetchCollectionDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollectionDetails.fulfilled, (state, action: PayloadAction<CollectionDetails>) => {
        state.loading = false;
        state.collectionDetails = action.payload;
      })
      .addCase(fetchCollectionDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch collection details";
      });
  },
});

export const { setFilterTypes } = collectionsSlice.actions;
export const selectFilteredCollections = (state: RootState) => state.collections.filteredCollections;
export const selectFilteredType = (state: RootState) => state.collections.filteredTypes;
export const selectCollections = (state: RootState) => state.collections.collections;
export const selectCollectionDetails = (state: RootState) => state.collections.collectionDetails;
export const selectLoading = (state: RootState) => state.collections.loading;
export const selectError = (state: RootState) => state.collections.error;

export default collectionsSlice.reducer;
