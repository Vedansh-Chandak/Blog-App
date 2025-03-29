import { Box, styled,FormControl, Input, InputBase, Button, TextareaAutosize } from "@mui/material";
import AddCircleIcon  from '@mui/icons-material/AddCircle';
import { useState, useEffect } from "react";
const Container = styled(Box)`
 margin: 50px 100px;
`

const Images = styled('img')({
 width:"100%",
 height:'50vh',
 objectFit: "cover"
})

const StyledFormControl = styled(FormControl)`
   margin-top: 10px;
   display: flex;
   flex-direction: row;

`

const InputTextField = styled(InputBase)`
flex: 1;
margin:0px 30px;
font-size: 25px;
`
const TextAreaAutosize = styled(TextareaAutosize)`
width: 100%;
margin-top: 50px;
font-size: 18px;
border: none;
&:focus-visible{
outline:none;
}
`

const initialPost ={
    title: "",
    description: "",
    picture: "",
    username: "",
    categories: "",
    createdDate: new Date()
}

const CreatePost = () => {
   const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
 const [post, setPost] = useState(initialPost)
 const [file, setFile] = useState("")

 useEffect(()=>{
    const getImage = ()=>{
    if(file){
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        //API CALL
        post.picture = "" //
    }
    }
    getImage();

    // post.categories;
 },[file])

 const handelChange = (e)=> {
    setPost({...post, [e.target.name]: e.target.value})
 }

    return(
     <Container>
        <Images src={url} alt="Banner"  />
 
      <StyledFormControl>
        <label htmlFor="fileinput" >
          <AddCircleIcon fontSize="large" color="action"/>
        </label>
        <Input type="file"
        id="fileinput"
        style={{display: "none"}}
        //SELECTION OF FILE
        onChange={(e)=>setFile(e.target.files[0])} />

<InputTextField placeholder="title" onChange={(e)=> handelChange(e)} name="title" />

<Button variant="contained">Publish</Button>
      </StyledFormControl>
      <TextAreaAutosize
       minRows={5}
       placeholder = " tell your story......"
onChange={(e)=> handelChange(e)} name="description"
      />

     </Container>
    )
}

export default CreatePost;