
import React from "react";
import { useState } from "react";
import Login from "./Components/Account/Login";
import DataProvider from "./context/DataProvider";
import Home from "./Components/home/Home";
import Header from "./Components/Header/Header";

import { BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router-dom'
const PrivateRoute = ({isAuthenticated, ...props})=>{
  return (
    isAuthenticated ? <>
        <Header/>
    <Outlet/>
     </> : <Navigate replace to="/login"/> 
  )
}

function App() {
const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
  
  <DataProvider>
    <BrowserRouter>

      <div
        style={{
      marginTop: "50px",
        }}
      >
        <Routes>
        <Route path="/login" element={<Login isUserAuthenticated= {isUserAuthenticated} />}/>
        //PRIVATE ROUTE
        <Route  path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
     <Route path="/" element={<Home/>} />

     </Route>
        </Routes>
      </div>
      </BrowserRouter>
    </DataProvider>

  );
}

export default App;
