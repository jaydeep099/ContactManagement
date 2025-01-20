import React, { useContext, useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

const CreateContact = () => {

  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    jobtitle: "",
    email: "",
    phone: "",
    company: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(userDetails),
    });
    const result = await res.json();
    if (!result.error) {
      console.log(`Created [${userDetails.firstname} ${userDetails.lastname}] contact`);
      setUserDetails({ firstname: "", lastname: "", jobtitle: "", email: "", phone: "", company: "" });
    } else {
      console.log(result.error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Create your contact</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="firstname"
          value={userDetails.firstname}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="lastname"
          value={userDetails.lastname}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Job Title"
          name="jobtitle"
          value={userDetails.jobtitle}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={userDetails.email}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
          type="email"
        />
        <TextField
          label="Phone"
          name="phone"
          value={userDetails.phone}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
          type="number"
        />
        <TextField
          label="Company"
          name="company"
          value={userDetails.company}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Contact
        </Button>
      </form>
    </Container>
  );
};

export default CreateContact;
