import React from "react";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import SongList from "./SongList";
import { CollectionDetails as CollectionDetailsType } from "../../types";
import { formatDuration, formatFileSize, formatDate } from "../../utils/formatters";

interface CollectionDetailsProps {
  details: CollectionDetailsType;
  isLoading: boolean;
}

const MetadataContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  backgroundColor: "#f7f9fc",
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

const MetadataItem = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
}));

const InfoLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 400,
}));

const InfoValue = styled(Typography)(() => ({
  fontSize: "0.875rem",
  fontWeight: 500,
}));

const CollectionDetails: React.FC<CollectionDetailsProps> = ({ details, isLoading }) => {

  const totalDuration = details.totalDuration || details.durationInSeconds;
  const totalSize = details.totalSize || details.sizeInBytes;

  return (
    <Box>
      <Typography variant="h5" component="h1" sx={{ mb: 2, fontWeight: 500 }}>
        {details.name}
      </Typography>

      <MetadataContainer>
        <MetadataItem>
          <InfoLabel>Artist</InfoLabel>
          <InfoValue>{details.artist}</InfoValue>
        </MetadataItem>
        <MetadataItem>
          <InfoLabel>Type</InfoLabel>
          <InfoValue>{details.type}</InfoValue>
        </MetadataItem>
        <MetadataItem>
          <InfoLabel>Song Count</InfoLabel>
          <InfoValue>{details.songCount}</InfoValue>
        </MetadataItem>
        <MetadataItem>
          <InfoLabel>Total Size</InfoLabel>
          <InfoValue>{formatFileSize(totalSize)}</InfoValue>
        </MetadataItem>
        <MetadataItem>
          <InfoLabel>Total Duration</InfoLabel>
          <InfoValue>{formatDuration(totalDuration)}</InfoValue>
        </MetadataItem>
        <MetadataItem>
          <InfoLabel>Released On</InfoLabel>
          <InfoValue>{formatDate(details.releasedOn)}</InfoValue>
        </MetadataItem>
      </MetadataContainer>

      <SongList songs={details.songs} isLoading={isLoading} />
    </Box>
  );
};

export default CollectionDetails;
