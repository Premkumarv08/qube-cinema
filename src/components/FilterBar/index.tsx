import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Menu,
  MenuItem,
  Checkbox,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { setFilterTypes } from "../../store/slices/collectionsSlice";
import { RootState, AppDispatch } from "../../store";
import { CollectionType } from "../../types";

interface FilterBarProps {
  onSearchChange: (searchTerm: string) => void;
}

const FilterBar = ({ onSearchChange }: FilterBarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const filteredTypes = useSelector((state: RootState) => state.collections.filteredTypes) || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<Record<string, boolean>>({
    Album: false,
    EP: false,
    Single: false,
  });

  useEffect(() => {
    const updatedTypes: Record<CollectionType, boolean> = {
      Album: filteredTypes.includes("Album"),
      EP: filteredTypes.includes("EP"),
      Single: filteredTypes.includes("Single"),
    };
    setSelectedTypes(updatedTypes);
  }, [filteredTypes]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTypeChange = (type: CollectionType) => {
    const newSelectedTypes = {
      ...selectedTypes,
      [type]: !selectedTypes[type],
    };

    setSelectedTypes(newSelectedTypes);

    const selectedFilters = Object.keys(newSelectedTypes).filter(
      (key) => newSelectedTypes[key as CollectionType]
    ) as CollectionType[];

    dispatch(setFilterTypes(selectedFilters));
  };

  const getFilterButtonLabel = () => {
    const count = filteredTypes.length;
    if (count === 0) return "Type";
    if (count === 1) return `Type: ${filteredTypes[0]}`;
    return `Type (${count})`;
  };

  const open = Boolean(anchorEl);
  const id = open ? "filter-popover" : undefined;

  return (
    <Box sx={{ display: "flex", mb: 3, gap: 2, alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center", maxWidth: 300, position: "relative" }}>
        <TextField
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          size="small"
          sx={{
            flexGrow: 1,
            width: "100%",
            "& .MuiOutlinedInput-root": {
              borderRadius: 1
            },
          }}
        />
        <SearchIcon color="action" sx={{position: "absolute", zIndex: 1, right: 8 }} />
      </Box>

      <Button
        aria-describedby={id}
        variant="outlined"
        onClick={handleFilterClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          borderRadius: 1,
          textTransform: "none",
          color: "text.primary",
          borderColor: "rgba(0, 0, 0, 0.23)",
          minWidth: 120,
        }}
      >
        {getFilterButtonLabel()}
      </Button>

      <Menu
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Typography variant="body2" sx={{ px: 2, py: 1, fontWeight: 500 }}>
          Type
        </Typography>
        <MenuItem dense onClick={() => handleTypeChange("Album")} sx={{ minWidth: 150 }}>
          <Checkbox checked={selectedTypes.Album} size="small" sx={{ p: 0.5, mr: 1 }} />
          <Typography variant="body2">Album</Typography>
        </MenuItem>
        <MenuItem dense onClick={() => handleTypeChange("EP")} sx={{ minWidth: 150 }}>
          <Checkbox checked={selectedTypes.EP} size="small" sx={{ p: 0.5, mr: 1 }} />
          <Typography variant="body2">EP</Typography>
        </MenuItem>
        <MenuItem dense onClick={() => handleTypeChange("Single")} sx={{ minWidth: 150 }}>
          <Checkbox checked={selectedTypes.Single} size="small" sx={{ p: 0.5, mr: 1 }} />
          <Typography variant="body2">Single</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default FilterBar;
