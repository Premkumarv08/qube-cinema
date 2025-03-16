import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import CollectionDetails from "../components/CollectionDetails";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage";
import {
  fetchCollectionDetails,
  selectCollectionDetails,
  selectLoading,
  selectError,
} from "../store/slices/collectionsSlice";
import { setBreadcrumbs, clearBreadcrumbs } from "../store/slices/breadcrumbsSlice";
import { AppDispatch, RootState } from "../store";

const CollectionDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const collectionDetails = useSelector((state: RootState) => selectCollectionDetails(state));
  const allCollections = useSelector((state: RootState) => state.collections.collections);
  const loading = useSelector((state: RootState) => selectLoading(state));
  const error = useSelector((state: RootState) => selectError(state));

  const collectionFromList = allCollections.find((collection) => collection.id === id);

  useEffect(() => {
    if (id) {
      dispatch(fetchCollectionDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const collectionName = collectionFromList?.name || collectionDetails?.name || `Collection ${id}`;
    dispatch(setBreadcrumbs([{ label: collectionName, path: `/collections/${id}` }]));
    return () => {
      dispatch(clearBreadcrumbs());
    };
  }, [collectionDetails]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message="Failed to load collection details. Please try again later." />
      ) : collectionDetails ? (
        <CollectionDetails details={collectionDetails} isLoading={loading} />
      ) : (
        <ErrorMessage message="Collection not found." />
      )}
    </Container>
  );
};

export default CollectionDetailsPage;
