import React, { useState, useEffect } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TextField, Switch, FormControlLabel } from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchError, setSearchError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();
      setUsers(data);
      setSearchError(""); // Clear search error message on successful fetch
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = () => {
    let sortedUsers = [...users];
    if (sortConfig.key) {
      sortedUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedUsers;
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setSearchError(""); // Clear previous search error message on new search
  };

  const usersToShow = searchTerm.trim().length === 0 ? sortedUsers() : sortedUsers().filter((user) =>
    Object.values(user).some((value) =>
      value != null && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const highlightSearchTerm = (text) => {
    if (searchTerm.trim().length === 0) {
      return text;
    }

    const lowerCaseText = text.toLowerCase();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const index = lowerCaseText.indexOf(lowerCaseSearchTerm);

    if (index === -1) {
      return text;
    }

    const firstPart = text.substring(0, index);
    const highlightedPart = text.substring(index, index + searchTerm.length);
    const lastPart = text.substring(index + searchTerm.length);

    return (
      <>
        {firstPart}
        <span style={{ backgroundColor: "#ffff00", fontWeight: "bold" }}>{highlightedPart}</span>
        {lastPart}
      </>
    );
  };

  const createSortHandler = (key, label) => {
    return (
      <TableSortLabel
        active={sortConfig.key === key}
        direction={sortConfig.key === key ? sortConfig.direction : 'asc'}
        onClick={() => requestSort(key)}
      >
        {label}
      </TableSortLabel>
    );
  };

  const handleIsApprovedChange = async (userId, isApproved) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isApproved: isApproved ? 1 : 0 }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      setUsers(users.map((user) =>
        user.UserId === userId ? { ...user, IsApproved: isApproved ? 1 : 0 } : user
      ));
    } catch (error) {
      setError(error.message);
    }
  };

  // Check if there are no search results
  useEffect(() => {
    if (searchTerm.trim().length > 0 && usersToShow.length === 0) {
      setSearchError("No matching results found.");
    } else {
      setSearchError("");
    }
  }, [searchTerm, usersToShow]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        margin="normal"
        style={{ marginBottom: '2rem', width: '30%' }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{createSortHandler('FirstName', 'First Name')}</TableCell>
              <TableCell>{createSortHandler('LastName', 'Last Name')}</TableCell>
              <TableCell>{createSortHandler('Mail', 'Email')}</TableCell>
              <TableCell>{createSortHandler('Phone', 'Phone')}</TableCell>
              <TableCell>{createSortHandler('City', 'City')}</TableCell>
              <TableCell>{createSortHandler('RoleName', 'Role')}</TableCell>
              <TableCell>{createSortHandler('IsApproved', 'Is Approved')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersToShow.map((user) => (
              <TableRow key={user.UserId}>
                <TableCell>{highlightSearchTerm(user.FirstName)}</TableCell>
                <TableCell>{highlightSearchTerm(user.LastName)}</TableCell>
                <TableCell>{highlightSearchTerm(user.Mail)}</TableCell>
                <TableCell>{highlightSearchTerm(user.Phone)}</TableCell>
                <TableCell>{highlightSearchTerm(user.City)}</TableCell>
                <TableCell>{highlightSearchTerm(user.RoleName)}</TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={Boolean(user.IsApproved)}
                        onChange={(event) => handleIsApprovedChange(user.UserId, event.target.checked)}
                        color="primary"
                      />
                    }
                    label={user.IsApproved ? "Approved" : "Not Approved"}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {searchError && <Typography color="error">{searchError}</Typography>}
    </Container>
  );
};

export default Users;