import React, { useState, useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import { useSnackbar } from "notistack";

import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import PostInput from "./components/Posts/PostInput";
import PostList from "./components/Posts/PostList";
import ContainerWrapper from "./components/Layout/ContainerWrapper";

import useAuth from "./hooks/useAuth";
import { getPosts, addPost, deletePost, updatePost } from "./api/api";

export default function App() {
  const { token, logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [view, setView] = useState(token ? "posts" : "login");
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  useEffect(() => {
    if (token) {
      setView("posts");
      fetchPosts();
    } else {
      setView("login");
    }
  }, [token]);

  async function fetchPosts() {
    try {
      const res = await getPosts();
      setPosts(res.data);
    } catch (e) {
      enqueueSnackbar("Failed to fetch posts", { variant: "error" });
    }
  }

  async function handleAddPost() {
    const { title, content } = newPost;
    if (!title.trim() || !content.trim()) {
      enqueueSnackbar("Title and content cannot be empty", { variant: "warning" });
      return;
    }
    try {
      const res = await addPost(title, content);
      setPosts((prev) => [...prev, res.data]);
      setNewPost({ title: "", content: "" });
      enqueueSnackbar("Post added", { variant: "success" });
    } catch {
      enqueueSnackbar("Failed to add post", { variant: "error" });
    }
  }

  async function handleDeletePost(id) {
    try {
      await deletePost(id);
      setPosts(posts.filter((p) => p.id !== id));
      enqueueSnackbar("Post deleted", { variant: "success" });
    } catch {
      enqueueSnackbar("Failed to delete post", { variant: "error" });
    }
  }

  async function handleEditPost(id, newTitle, newContent) {
    try {
      const res = await updatePost(id, newTitle, newContent);
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, title: res.data.title, content: res.data.content } : p))
      );
      enqueueSnackbar("Post updated", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("Failed to update post", { variant: "error" });
    }
  }

  return (
    <ContainerWrapper fullWidth={view !== "login" && view !== "register"}>
      {view === "login" && <LoginForm switchToRegister={() => setView("register")} />}
      {view === "register" && <RegisterForm switchToLogin={() => setView("login")} />}
      {view === "posts" && (
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4">Posts</Typography>
            <Button variant="outlined" color="error" onClick={logout}>
              Logout
            </Button>
          </Box>

          <PostInput
            newPost={newPost}
            setNewPost={setNewPost}
            onAdd={handleAddPost}
          />
          <PostList
            posts={posts}
            onDelete={handleDeletePost}
            onEdit={handleEditPost}
          />
        </Box>
      )}
    </ContainerWrapper>
  );
}
