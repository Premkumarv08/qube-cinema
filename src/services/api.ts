import axios from 'axios';
import { Collection, CollectionDetails } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const getAllCollections = async (): Promise<Collection[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/collections`);
    return response.data;
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw error;
  }
};

export const getCollectionById = async (id: string): Promise<CollectionDetails> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/collections/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching collection with id ${id}:`, error);
    throw error;
  }
};