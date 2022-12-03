// react
import React from "react";
// firebase
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
// Router
import { Link, useNavigate } from "react-router-dom";
// MUI
import {
  IconButton,
  useTheme,
  Box,
  Typography,
  TextField,
  Button,
  Card,
} from "@mui/material";
// redux
import { useDispatch } from "react-redux";
// images
import wave from "../assets/img/wavebg.png";
// components
import MyAlert from "../components/MyAlert";

const textFieldStyle = {
  width: 1,
  mb: 1,
};

// function to change format of error string
function authErrorFormat(text) {
  return text.slice(5).split("-").join(" ");
}

function SignUpScreen() {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = React.useState({});
  const [signUpError, setSignUpError] = React.useState("");

  // function to capitalize name
  function capitalizeWords(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].slice(1);
    }
    return splitStr.join(" ");
  }

  //   function to make components controlled
  function handleChange(e) {
    const target = e.target;
    setCredentials((state) => ({
      ...state,
      [target.name]: target.value,
    }));
  }

  //   function to handle submit
  function handleSubmit(e) {
    e.preventDefault();
    setSignUpError("");
    // client side error handling
    let isError = false;

    for (let credential in credentials) {
      if (credentials[credential] == "") {
        setFormError((state) => ({
          ...state,
          [credential]: true,
        }));
        isError = true;
      } else {
        setFormError((prev) => ({
          ...prev,
          [credential]: false,
        }));
      }
    }
    if (credentials.password !== credentials.confirmPassword) {
      setFormError((prev) => ({
        ...prev,
        confirmPassword: true,
        passwordsDontMatch: true,
      }));
      isError = true;
    } else {
      setFormError((prev) => ({
        ...prev,
        confirmPassword: false,
        passwordsDontMatch: false,
      }));
    }

    if (isError) return;

    // create new user in firebase
    createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
      // .then((userCredential) => {
      //   // adding new user info in a document
      //   console.log(userCredential);
      //   setDoc(doc(db, "users", userCredential.user.uid), {
      //     email: userCredential.user.email,
      //     name: capitalizeWords(credentials.name),
      //   });
      // })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setSignUpError("Error: " + authErrorFormat(error.code));
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
  }

  return (
    <>
      {" "}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          minHeight: "100vh",
          py: 10,
          boxSizing: "border-box",
          backgroundImage: `url(${wave})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100vw 80vh",
          backgroundPosition: "bottom",
          backgroundColor: "neutral.main",
        }}
      >
        <Card
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            px: 4,
            py: 6,
            width: "90%",
            maxWidth: "350px",
          }}
        >
          <Typography variant="h4">Welcome!</Typography>
          <Typography variant="h5">Create a new account.</Typography>
          {/* name */}
          <TextField
            required
            sx={textFieldStyle}
            name="name"
            type="text"
            color="secondary"
            placeholder="John Doe"
            label="Name"
            variant="outlined"
            onChange={handleChange}
            error={formError.name}
            helperText={formError.name && "Please enter name"}
          />
          {/* email */}
          <TextField
            required
            sx={textFieldStyle}
            name="email"
            type="email"
            color="secondary"
            placeholder="johndoe@email.com"
            label="Email"
            variant="outlined"
            onChange={handleChange}
            error={formError.email}
            helperText={formError.email && "Please enter email"}
          />
          {/* password */}
          <TextField
            required
            sx={textFieldStyle}
            name="password"
            type="password"
            color="secondary"
            placeholder="Password"
            label="Password"
            variant="outlined"
            onChange={handleChange}
            error={formError.password}
            helperText={formError.password && "Please enter password"}
          />
          {/* confirm password */}
          <TextField
            required
            sx={textFieldStyle}
            name="confirmPassword"
            type="password"
            color="secondary"
            placeholder="Confirm password"
            label="Confirm password"
            variant="outlined"
            onChange={handleChange}
            error={formError.confirmPassword}
            helperText={
              formError.confirmPassword &&
              (formError.passwordsDontMatch
                ? "Passwords don't match"
                : "Please re-enter password")
            }
          />
          <Button
            sx={{ width: "100%", my: 1 }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            type="submit"
          >
            Sign up
          </Button>
          <Typography variant="body1">
            Already have an account?{" "}
            <Link to="/signin">
              {" "}
              <span
                style={{ color: theme.palette.text.primary, fontWeight: 600 }}
              >
                Sign In
              </span>
            </Link>
          </Typography>
        </Card>
        {signUpError && (
          <Box sx={{ position: "fixed", top: "100px" }}>
            <MyAlert severity="error">{signUpError}</MyAlert>
          </Box>
        )}
      </Box>
    </>
  );
}

export default SignUpScreen;