import React, { useContext } from "react";
import { useState } from "react";
import { API } from "../../service/api.js";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import {DataContext} from "../../context/DataProvider.jsx";
import { useNavigate } from "react-router-dom";
const Component = styled(Box)`
   width: 400px;
   margin: auto:
   display: flex;
   box-shadow: 5px 2px 5px 2px rgb(0 0 0 /0.6);
   `;
const LoginButton = styled(Button)`
  text-transform: none;
  height: 48px;
  background: #87cefa;
  border-radius: 0px;
  colour: #fff;
`;
const SignupButton = styled(Button)`
  text-transform: none;
  height: 48px;
  background: white;
  border-radius: 0px;
  colour: #fff;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 /0.2);
  border-radius: 10px;
`;

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const Error = styled(Typography)`
  font-size: 10px;
  colour: red;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0 ",
});

const loginInitialValue = {
  username: "",
  password: "",
}

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

const Login = ({isUserAuthenticated}) => {
  const ImgUrl =
    "https://imgs.search.brave.com/JqgdIWrQurPXtphlqU2hFpD1FzBD5ZQAJs0pOYiJZ9Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/LmNvbS9pbWFnZS1j/ZG4vaW1hZ2VzL2t0/czkyOHBkL3Byb2R1/Y3Rpb24vM2QwYTE5/NDJlYTYxNzgyNWUx/ODdjM2M5YTM4MTFh/NWQ5M2EzMzFiZS0z/NzB4MzY2LnBuZz93/PTEwODAmcT03MiZm/bT13ZWJw";
  const [account, toggleAccount] = useState("login");
  const [signup, setsignup] = useState(signupInitialValues);
  const [error, setError] = useState("");
  const [login, setLogin] = useState(loginInitialValue);
  const {setAccount} = useContext(DataContext);
  const nevigate = useNavigate();
  const toogleSignup = () => {
    account === "login" ? toggleAccount("signup") : toggleAccount("login");
  };

  // SIGNUP USER CONTROLLER
  const onInputchange = (e) => {
    setsignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signUpUser = async () => {
    let response = await API.userSignup(signup);
    console.log(response.data);
    if (response.isSuccess) {
      setError("");
      setsignup(signupInitialValues);
      toggleAccount("login");
    } else {
      setError("something went wrong please try again");
    }
  };
//   LOGIN USER CONTROLLER
  const onValueChange = (e)=> {
setLogin({...login, [e.target.name]: e.target.value});
  }

  const loginUser = async () => {
    let response = await API.userLogin(login);
    console.log(response.data);
    if(response.isSuccess){
      setError("");
    
      sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
      sessionStorage.setItem('refreshToken' , `Bearer ${response.data.refreshToken}`);
      setAccount({username: response.data.username, name: response.data.name});
      isUserAuthenticated(true);
      nevigate("/");
    }
    else{
      setError("something went wrong please try again")
    }
  }
  return (
    <Component>
      <Box>
        <Image src={ImgUrl} alt="Logo" />
        {account === "login" ? (
          <Wrapper>
            <TextField variant="standard" value={login.username} onChange={(e)=> onValueChange(e)} name = "username" label="Enter username" />
            <TextField variant="standard" value={login.password} onChange={(e)=> onValueChange(e)} name ="password" label="Enter Password" />
            <LoginButton onClick={()=> loginUser()} variant="contained">Login</LoginButton>
            <Typography>OR</Typography>
            <SignupButton onClick={() => toogleSignup()}>
              Create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              onChange={(e) => onInputchange(e)}
              name="name"
              variant="standard"
              label="Enter Name"
            />
            <TextField
              onChange={(e) => onInputchange(e)}
              name="username"
              variant="standard"
              label="Enter username"
            />
            <TextField
              onChange={(e) => onInputchange(e)}
              name="password"
              variant="standard"
              label="Enter Password"
            />
            {error && <Error>{error}</Error>}
            <LoginButton onClick={() => signUpUser()} variant="contained">
              SignUp
            </LoginButton>
            <Typography>OR</Typography>
            <SignupButton
              onClick={() => {
                toggleAccount("login");
              }}
            >
              Already have an account
            </SignupButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};
export default Login;
