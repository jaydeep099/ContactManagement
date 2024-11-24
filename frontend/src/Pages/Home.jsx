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

  const handleAddContact = () => {
    navigate("/contacts");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h3" gutterBottom>
          Welcome {user ? user.name : "Guest"}
        </Typography>
        <hr />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleAddContact}
        >
          Add Contacts
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
