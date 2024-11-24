import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Container, Typography, Button, Box } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/signin", { replace: true });
    }
  }, [user, navigate]);

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom>
          Welcome {user ? user.name : null}
        </Typography>
        <hr />
        <Button variant="contained" color="info" sx={{ mt: 2 }}>
          Add Contacts
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
