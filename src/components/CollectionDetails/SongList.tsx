import React from "react";
import DataTable, { Column } from "../shared/DataTable";
import { Song } from "../../types";
import { formatDuration, formatFileSize } from "../../utils/formatters";

interface SongListProps {
  songs: Song[];
  isLoading: boolean;
}

const SongList: React.FC<SongListProps> = ({ songs, isLoading }) => {
  const columns: Column<Song>[] = [
    { 
      id: "title", 
      label: "Song", 
      minWidth: 200,
      getValue: (row) => row.title
    },
    { 
      id: "performers", 
      label: "Performers",
      getValue: (row) => row.performers,
      format: (value) => Array.isArray(value) ? value.join(", ") : value 
    },
    { 
      id: "durationInSeconds", 
      label: "Duration", 
      align: "left",
      getValue: (row) => row.durationInSeconds,
      format: (value) => formatDuration(value) 
    },
    { 
      id: "sizeInBytes", 
      label: "Size", 
      align: "left",
      getValue: (row) => row.sizeInBytes,
      format: (value) => formatFileSize(value) 
    }
  ];

  return (
    <DataTable
      data={songs}
      columns={columns}
      isLoading={isLoading}
      rowKey={(row) => `song-${row.title}`}
      emptyMessage="No songs found."
      loadingMessage="Loading songs..."
      tableProps={{ size: "small" }}
    />
  );
};

export default SongList;