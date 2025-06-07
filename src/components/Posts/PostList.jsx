import React, { useState } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

export default function PostList({ posts, onDelete, onEdit }) {
  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const startEditing = (post) => {
    setEditingPostId(post.id);
    setEditContent(post.content);
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setEditContent("");
  };

  const saveEdit = () => {
    if (editContent.trim()) {
      onEdit(editingPostId, editContent);
      cancelEdit();
    }
  };

  return (
    <Paper>
      <List>
        {posts.length === 0 && (
          <ListItem>
            <ListItemText primary="No posts available." />
          </ListItem>
        )}
        {posts.map((post) => (
          <ListItem key={post.id} divider alignItems="flex-start">
            {editingPostId === post.id ? (
              <Box width="100%">
                <TextField
                  fullWidth
                  multiline
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <Box mt={1} display="flex" gap={1}>
                  <Button
                    startIcon={<SaveIcon />}
                    variant="contained"
                    color="primary"
                    onClick={saveEdit}
                  >
                    Save
                  </Button>
                  <Button
                    startIcon={<CancelIcon />}
                    variant="outlined"
                    color="secondary"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <ListItemText primary={post.content} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => startEditing(post)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => onDelete(post.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
