import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../context/UserContext";
import { deleteUser, getUsersFetch } from "../store/actions";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Box, Button, IconButton, InputBase, Typography } from "@mui/material";
import { Add, Delete, Edit, Search as SearchIcon } from "@mui/icons-material";
import AlertModal from "./AlertModal";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.grey[500],
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    background: theme.palette.background.default,
    fontSize: 14,
    color: theme.palette.grey[600],
    fontWeight: 500,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function UsersList() {
  const users = useSelector((state) => state.usersReducer.users);

  const [openModal, setOpenModal] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user, setUser, clearUser } = useUser();

  const handleSearctText = (event) => {
    setSearchText(event.target.value);
  };

  const dispatchDeleteUser = () => {
    dispatch(deleteUser(user.id));
    clearUser();
  };

  const handleDeleteUser = (user) => {
    setUser(user);
    setOpenModal(true);
  };

  const handleEditUser = (user) => {
    setUser(user);
    navigate("/users/edit");
  };

  useEffect(() => {
    dispatch(getUsersFetch());
  }, [dispatch]);

  useEffect(() => {
    if (!searchText.length) {
      setFilteredUsers(users);
    } else {
      const findedUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchText.toLowerCase()) ||
          user.username.toLowerCase().includes(searchText.toLowerCase()) ||
          user.address.city.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase())
      );

      setFilteredUsers(findedUsers);
    }
  }, [searchText, users]);

  if (!users.length) {
    return <div />;
  }

  return (
    <div>
      <Box
        sx={{ display: "flex" }}
        my={3}
        px={2}
        justifyContent="space-between"
      >
        <Typography variant="h5" component="h5">
          Users
        </Typography>

        <div style={{ display: "flex" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon color="primary" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearctText}
            />
          </Search>

          <Button
            onClick={() => navigate("/users/new")}
            variant="contained"
            endIcon={<Add />}
          >
            Add User
          </Button>
        </div>
      </Box>

      <AlertModal
        open={openModal}
        setOpen={setOpenModal}
        title="Are you sure?"
        message="Do you really want to delete this user? This process cannot be undone."
        actionButtonMessage="Delete user"
        isDangerousAction
        action={dispatchDeleteUser}
      />

      <Box px={2}>
        <TableContainer component={Paper} sx={{ maxHeight: 450 }}>
          <Table stickyHeader aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>User ID</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Username</StyledTableCell>
                <StyledTableCell align="right">City</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell component="th" scope="row">
                    {user.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{user.name}</StyledTableCell>
                  <StyledTableCell align="right">
                    {user.username}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {user.address.city}
                  </StyledTableCell>
                  <StyledTableCell align="right">{user.email}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      onClick={() => handleEditUser(user)}
                      color="primary"
                      aria-label="edit"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteUser(user)}
                      color="error"
                      aria-label="delete"
                    >
                      <Delete />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
