import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollections } from '../store/slices/collectionsSlice';
import { RootState, AppDispatch } from '../store';

export const useCollections = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    collections, 
    filteredCollections,
    filteredTypes,
    loading, 
    error 
  } = useSelector((state: RootState) => state.collections);

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  return { 
    collections,
    filteredCollections,
    filteredTypes,
    loading, 
    error 
  };
};