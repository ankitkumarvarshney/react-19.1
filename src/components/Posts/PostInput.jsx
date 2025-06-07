// import React from "react";
import { Box, TextField, Button } from "@mui/material";

export default function PostInput({ newPost, setNewPost, onAdd }) {
  return (
    <Box display="flex" gap={1} mb={3}>
      <TextField
        fullWidth
        multiline
        minRows={2}
        placeholder="Write a new post..."
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
      />
      <Button variant="contained" onClick={onAdd}>Add</Button>
    </Box>
  );
}
