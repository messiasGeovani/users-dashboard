import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addUser, updateUser } from "../store/users";

import { v4 as uuidv4 } from "uuid";
import { useUser } from "../context/UserContext";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AccountCircle, Email, LocationOn, Person } from "@mui/icons-material";

import * as yup from "yup";

export default function UserForm() {
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    username: "",
    city: "",
    email: "",
  });

  const { user, setUser, clearUser } = useUser();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const dispatchAddUser = () => dispatch(addUser(user));
  const dispatchUpdateUser = () => dispatch(updateUser(user));

  const handleChange = (field) => (event) => {
    if (field === "city") {
      return setUser({
        ...user,
        address: { city: event.target.value },
      });
    }

    return setUser({ ...user, [field]: event.target.value });
  };

  const handleCancel = () => {
    clearUser();
    navigate("/");
  };

  const validateFields = async () => {
    const schema = yup.object().shape({
      name: yup.string("name must be text").required("name is required"),
      username: yup
        .string("username must be text")
        .required("username is required"),
      address: yup.object().shape({
        city: yup.string("city must be text").required("city is required"),
      }),
      email: yup
        .string("email must be text")
        .email("invalid email format")
        .required("email is required"),
    });

    try {
      await schema.validate(user, { abortEarly: false });
      setValidationErrors({
        name: "",
        username: "",
        city: "",
        email: "",
      });

      return true;
    } catch (error) {
      error.errors.forEach((err) =>
        Object.keys(user).forEach((key) => {
          if (err.includes(key)) {
            return setValidationErrors((oldState) => ({
              ...oldState,
              [key]: err,
            }));
          }

          if (key === "address" && err.includes("city")) {
            return setValidationErrors((oldState) => ({
              ...oldState,
              city: err,
            }));
          }
        })
      );

      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValidFields = await validateFields();

    if (!isValidFields) {
      return;
    }

    if (!user.id) {
      const newUser = user;
      newUser.id = uuidv4();
      setUser(newUser);
      dispatchAddUser(user);
      clearUser();
      return navigate("/");
    }

    dispatchUpdateUser(user);
    clearUser();
    navigate("/");
  };

  useEffect(() => {
    if (user.address.city.length) {
      setValidationErrors({ ...validationErrors, city: "" });
    }

    Object.keys(user).forEach((key) => {
      if (user[key].length) {
        setValidationErrors((oldState) => ({ ...oldState, [key]: "" }));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Paper sx={{ width: 800, p: 4, background: "#fff" }}>
        <Typography color="primary" variant="h5" component="h4">
          {!user.id ? "New user" : "Edit user"}
        </Typography>

        <br />

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1.5 },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Person
                sx={{ color: "action.active", mr: 1, my: 0.5, mb: 1.5 }}
              />
              <TextField
                error={!!validationErrors.name}
                helperText={validationErrors.name}
                value={user.name}
                onChange={handleChange("name")}
                fullWidth
                id="input-with-sx"
                label="Name"
                variant="standard"
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccountCircle
                sx={{ color: "action.active", mr: 1, my: 0.5, mb: 1.5 }}
              />
              <TextField
                error={!!validationErrors.username}
                helperText={validationErrors.username}
                value={user.username}
                onChange={handleChange("username")}
                fullWidth
                id="input-with-sx"
                label="Username"
                variant="standard"
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <LocationOn
                sx={{ color: "action.active", mr: 1, my: 0.5, mb: 1.5 }}
              />
              <TextField
                error={!!validationErrors.city}
                helperText={validationErrors.city}
                value={user.address.city}
                onChange={handleChange("city")}
                fullWidth
                id="input-with-sx"
                label="City"
                variant="standard"
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Email sx={{ color: "action.active", mr: 1, my: 0.5, mb: 1.5 }} />
              <TextField
                error={!!validationErrors.email}
                helperText={validationErrors.email}
                value={user.email}
                onChange={handleChange("email")}
                fullWidth
                id="input-with-sx"
                label="Email"
                variant="standard"
              />
            </Box>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleCancel} color="error" sx={{ mt: 3 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" sx={{ mt: 3, ml: 3 }}>
                {user.id ? "Update user" : "Add user"}
              </Button>
            </div>
          </Box>
        </form>
      </Paper>
    </div>
  );
}
