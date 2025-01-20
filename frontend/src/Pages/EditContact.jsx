import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";
import Spinner from "../components/Spinner"; 

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    jobtitle: "",
    email: "",
    phone: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/contact`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...userDetails }),
    });
    const result = await res.json();
    if (!result.error) {
      console.log(`updated [${userDetails.firstname} ${userDetails.lastname}] contact`);

      setUserDetails({
        firstname: "",
        lastname: "",
        jobtitle: "",
        email: "",
        phone: "",
        company: "",
      });
      navigate("/mycontacts");
    } else {
      console.log(result.error);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/contact/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        setUserDetails({
          firstname: result.firstname,
          lastname: result.lastname,
          jobtitle: result.jobtitle,
          email: result.email,
          phone: result.phone,
          company: result.company,
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false); 
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Spinner splash="Loading Contact..." />
        </Box>
      ) : (
        <>
          <h2>Edit your contact</h2>

          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="firstname"
              value={userDetails.firstname}
              onChange={handleInputChange}
              placeholder="John"
              required
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="lastname"
              value={userDetails.lastname}
              onChange={handleInputChange}
              placeholder="Doe"
              required
            />
            <TextField
              label="Job Title"
              variant="outlined"
              fullWidth
              margin="normal"
              name="jobtitle"
              value={userDetails.jobtitle}
              onChange={handleInputChange}
              placeholder="Software Engineer"
              required
            />
            <TextField
              label="Company"
              variant="outlined"
              fullWidth
              margin="normal"
              name="company"
              value={userDetails.company}
              onChange={handleInputChange}
              placeholder="TechCorp"
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              placeholder="johndoe@example.com"
              required
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
              placeholder="+977 987654321"
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "20px" }}
            >
              Save Changes
            </Button>
          </form>
        </>
      )}
    </>
  );
};

export default EditContact;
