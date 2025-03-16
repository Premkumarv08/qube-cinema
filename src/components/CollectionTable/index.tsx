import React from "react";
import DataTable, { Column } from "../shared/DataTable";
import { Collection } from "../../types";
import { formatDuration, formatFileSize, formatDate } from "../../utils/formatters";
import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router";

interface CollectionTableProps {
  collections: Collection[];
  isLoading: boolean;
}

const CollectionTable: React.FC<CollectionTableProps> = ({ collections, isLoading }) => {
  const navigate = useNavigate();

  const handleViewDetails = (id: string) => {
    navigate(`/collections/${id}`);
  };

  const columns: Column<Collection>[] = [
    { 
      id: "name", 
      label: "Collection Name", 
      minWidth: 170,
      getValue: (row) => row.name,
      format: (_, row) => (
        <div>
          <div style={{ fontWeight: 500, fontSize: "0.875rem" }}>{row.name}</div>
          <div style={{ color: "text.secondary", fontSize: "0.75rem" }}>{row.artist}</div>
        </div>
      )
    },
    { 
      id: "type", 
      label: "Type",
      getValue: (row) => row.type
    },
    { 
      id: "songCount", 
      label: "Song Count", 
      align: "right",
      getValue: (row) => row.songCount
    },
    { 
      id: "durationInSeconds", 
      label: "Duration", 
      align: "right",
      getValue: (row) => row.durationInSeconds,
      format: (value) => formatDuration(value) 
    },
    { 
      id: "sizeInBytes", 
      label: "Size", 
      align: "center",
      getValue: (row) => row.sizeInBytes,
      format: (value) => formatFileSize(value) 
    },
    { 
      id: "releasedOn", 
      label: "Released On",
      getValue: (row) => row.releasedOn,
      format: (value) => formatDate(value) 
    },
    {
      id: "actions",
      label: "",
      align: "right",
      getValue: (row) => row.id,
      format: (id) => (
        <Button 
          size="small" 
          onClick={() => handleViewDetails(id)}
          startIcon={<VisibilityIcon fontSize="small" />}
          sx={{
            textTransform: "none",
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          View Details
        </Button>
      )
    }
  ];

  return (
    <DataTable
      data={collections}
      columns={columns}
      isLoading={isLoading}
      rowKey={(row) => row.id}
      emptyMessage="No collections found."
      loadingMessage="Loading collections..."
      paperProps={{ sx: { mt: 2 } }}
    />
  );
};

export default CollectionTable;