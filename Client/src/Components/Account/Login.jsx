import React from "react"
import { useState } from "react";

import {Box, TextField, Button, styled, Typography} from '@mui/material';
const Component = styled(Box)`
   width: 400px;
   margin: auto:
   display: flex;
   box-shadow: 5px 2px 5px 2px rgb(0 0 0 /0.6);
   `
const LoginButton = styled(Button)`
  text-transform: none;
  height: 48px;
  background: #87CEFA;
  border-radius: 0px;
  colour: #fff;
`
const SignupButton = styled(Button)`
text-transform: none;
height: 48px;
  background: white;
  border-radius: 0px;
  colour: #fff;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 /0.2);
  border-radius: 10px
  `

   const Wrapper = styled(Box)`
   padding: 25px 35px;
   display: flex;
    flex: 1;
    flex-direction: column;
    & > div, & > button, & > p{
    margin-top: 20px
     }
   `
const Image = styled('img')({
    width: 100,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0 ',

})
const Login = () =>{
    const ImgUrl = "https://imgs.search.brave.com/JqgdIWrQurPXtphlqU2hFpD1FzBD5ZQAJs0pOYiJZ9Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/LmNvbS9pbWFnZS1j/ZG4vaW1hZ2VzL2t0/czkyOHBkL3Byb2R1/Y3Rpb24vM2QwYTE5/NDJlYTYxNzgyNWUx/ODdjM2M5YTM4MTFh/NWQ5M2EzMzFiZS0z/NzB4MzY2LnBuZz93/PTEwODAmcT03MiZm/bT13ZWJw"
    const [account, toggleAccount] = useState('login')
    const toogleSignup = () =>{
     account === 'login' ? toggleAccount('signup') : toggleAccount('login');
    }
    return(
    <Component>
       <Box>
       <Image src={ImgUrl} alt="Logo"/>
     { account === 'login' ?
        <Wrapper>
        
        <TextField variant="standard" label="Enter username"/>
        <TextField variant="standard" label="Enter Password" />
        <LoginButton variant="contained">Login</LoginButton>
        <Typography>
            OR
        </Typography>
        <SignupButton onClick={()=> toogleSignup()}>Create an account</SignupButton>
        </Wrapper>
:
        <Wrapper>
        <TextField variant="standard" label="Enter Name" />
        <TextField variant="standard" label="Enter username"/>
        <TextField variant="standard" label="Enter Password" />
        <LoginButton variant="contained">SignUp</LoginButton>
        <Typography>
            OR
        </Typography>
        <SignupButton onClick={()=>{
            toggleAccount('login')
        }}>Already have an account</SignupButton>
        </Wrapper>
}
       </Box>
    </Component>
    )
}
export default Login