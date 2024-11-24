import React, { useEffect, useState } from "react";
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const AllContact = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedContact, setSelectedContact] = useState(null); 

  useEffect(() => {
    setLoading(true);
    const fetchContacts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/mycontacts", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setContacts(result.contacts);
          setLoading(false);
        } else {
          console.log(result.error);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchContacts();
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const filteredContacts = contacts.filter((contact) =>
      `${contact.firstname} ${contact.lastname}`
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    );
    setContacts(filteredContacts);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        const res = await fetch(`http://localhost:8000/api/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setContacts(result.myContacts);
          setSelectedContact(null);
        } else {
          console.log(result.error);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const currentContacts = contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Your Contacts</Typography>
      <Button variant="contained" color="error" href="/getcontacts" sx={{ marginBottom: 2 }}>
        Reload Contacts
      </Button>
      <hr style={{ margin: "1rem 0" }} />

      {loading ? (
        <Spinner splash="Loading Contacts..." />
      ) : (
        <>
          {contacts.length === 0 ? (
            <Typography variant="h6" color="textSecondary">No contacts created yet</Typography>
          ) : (
            <>
              <form onSubmit={handleSearchSubmit} style={{ display: "flex", marginBottom: "1rem" }}>
                <TextField
                  label="Search Contact"
                  variant="outlined"
                  sx={{ marginRight: 2, flex: 1 }}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <Button type="submit" variant="contained" color="info">
                  Search
                </Button>
              </form>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Job Title</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Company</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentContacts.map((contact) => (
                      <TableRow
                        key={contact._id}
                        hover
                        onClick={() => setSelectedContact(contact)}
                      >
                        <TableCell>{contact.firstname} {contact.lastname}</TableCell>
                        <TableCell>{contact.jobtitle}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        <TableCell>{contact.company}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={contacts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />

              {selectedContact && (
                <Box sx={{ marginTop: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {selectedContact.firstname} {selectedContact.lastname}
                  </Typography>
                  <Typography><strong>Job Title:</strong> {selectedContact.jobtitle}</Typography>
                  <Typography><strong>Email:</strong> {selectedContact.email}</Typography>
                  <Typography><strong>Phone Number:</strong> {selectedContact.phone}</Typography>
                  <Typography><strong>Company:</strong> {selectedContact.company}</Typography>

                  <Box sx={{ marginTop: 2 }}>
                    <Link to={`/edit/${selectedContact._id}`}>
                      <Button variant="contained" color="info" sx={{ marginRight: 2 }}>
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteContact(selectedContact._id)}
                      sx={{ marginRight: 2 }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => setSelectedContact(null)}
                    >
                      Close
                    </Button>
                  </Box>
                </Box>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default AllContact;
