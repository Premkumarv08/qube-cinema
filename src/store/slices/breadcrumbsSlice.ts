import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Breadcrumb = {
  label: string;
  path?: string;
};

interface BreadcrumbsState {
  items: Breadcrumb[];
}

const initialState: BreadcrumbsState = {
  items: []
};

const breadcrumbsSlice = createSlice({
  name: 'breadcrumbs',
  initialState,
  reducers: {
    setBreadcrumbs(state, action: PayloadAction<Breadcrumb[]>) {
      state.items = action.payload;
    },
    clearBreadcrumbs(state) {
      state.items = [];
    }
  }
});

export const { setBreadcrumbs, clearBreadcrumbs } = breadcrumbsSlice.actions;
export default breadcrumbsSlice.reducer;