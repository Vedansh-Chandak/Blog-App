import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, CircularProgress, Box } from "@mui/material";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/posts", {
          withCredentials: true, // ✅ Keep CORS settings if necessary
        });
        console.log("Fetched Posts:", response.data); // ✅ Debugging API response
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // ✅ Stop loading after fetch attempt
      }
    };

    fetchPosts();
  }, []);

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Posts
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post._id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {post.description}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                By {post.username} on {new Date(post.createdDate).toDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography align="center" color="textSecondary">
          No posts available.
        </Typography>
      )}
    </Box>
  );
};

export default PostList;
