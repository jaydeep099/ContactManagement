import React from "react";
import { CircularProgress, Typography, Box } from "@mui/material";

const Spinner = ({ splash = "Loading..." }) => {
  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <CircularProgress sx={{ size: 60, margin: 5 }} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {splash}
      </Typography>
    </Box>
  );
};

export default Spinner;
