import React, { useState, useEffect, useContext } from 'react';
import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import axios from 'axios';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
};

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { account } = useContext(DataContext);
    
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState(null);

    const defaultImage = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    const url = post.picture || defaultImage;

    useEffect(() => {
        if (file) {
            const uploadImage = async () => {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                try {
                    const response = await axios.post('http://localhost:8000/file/upload', data, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });

                    console.log("File Upload Response:", response.data); // Debugging

                    if (response.data?.url) {
                        setPost(prevState => ({
                            ...prevState,
                            picture: response.data.url
                        }));
                    }
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            };

            uploadImage();
        }

        // Update post details
        setPost(prevState => ({
            ...prevState,
            categories: location.search?.split('=')[1] || 'All',
            username: account.username
        }));
    }, [file, location.search, account.username]);

    const savePost = async () => {
        try {
            let response = await API.createPost(post);
            if (response.isSuccess) {
                navigate('/');
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const handleChange = (e) => {
        setPost(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <Container>
            <Image src={url} alt="post" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField onChange={handleChange} name='title' placeholder="Title" />
                <Button onClick={savePost} variant="contained" color="primary">Publish</Button>
            </StyledFormControl>

            <Textarea
                rowsMin={5}
                placeholder="Tell your story..."
                name='description'
                onChange={handleChange}
            />
        </Container>
    );
};

export default CreatePost;
