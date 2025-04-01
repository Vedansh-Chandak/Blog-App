import React from "react";
import { Grid } from "@mui/material";
//compoenents
import Banner from "../banner/Banner";
import Categories from "./Categories";
import Posts from "./post/Post";
const Home = () =>{
 return (
<>
<Banner/>
<Grid container>
    <Grid item lg={2} sm={2} xs={12}>
        <Categories/>
    </Grid>
<Grid constainer item xs={12} sm={10} lg={10}>
<Posts/>
</Grid>
</Grid>

</>
 )
 
}

export default Home;