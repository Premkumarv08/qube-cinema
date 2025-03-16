import React, { useState } from "react";
import { Container } from "@mui/material";
import CollectionTable from "../components/CollectionTable";
import FilterBar from "../components/FilterBar";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage";
import { useCollections } from "../hooks/useCollections";

const CollectionsPage: React.FC = () => {
  const { filteredCollections, loading, error } = useCollections();
  const [searchQuery, setSearchQuery] = useState("");

  const searchFilteredCollections = filteredCollections.filter((collection) => {
    if (!searchQuery) return true;

    return (
      collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <FilterBar onSearchChange={handleSearchChange} />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message="Failed to load collections. Please try again later." />
      ) : (
        <CollectionTable collections={searchFilteredCollections} isLoading={loading} />
      )}
    </Container>
  );
};

export default CollectionsPage;
