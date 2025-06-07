import { useState } from "react";
import {
    Paper,
    List,
    ListItem,
    ListItemText,
    IconButton,
    TextField,
    Button,
    Box,
    Typography,
    Stack,
    Avatar,
    Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import ArticleIcon from "@mui/icons-material/Article";

export default function PostList({ posts, onDelete, onEdit }) {
    const [editingPostId, setEditingPostId] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [editTitle, setEditTitle] = useState("");
    
    const startEditing = (post) => {
        setEditingPostId(post.id);
        setEditTitle(post.title);
        setEditContent(post.content);
    };

    const cancelEdit = () => {
        setEditingPostId(null);
        setEditContent("");
        setEditTitle("");
    };

    const saveEdit = () => {
        if (editContent.trim()) {
            onEdit(editingPostId, editTitle, editContent);
            cancelEdit();
        }
    };

    return (
        <Paper
            elevation={4}
            sx={{
                maxWidth: "100vw",
                margin: "32px auto",
                borderRadius: 3,
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                p: 2,
            }}
        >
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, textAlign: "center", color: "#3f51b5" }}>
                Posts
            </Typography>
            <List>
                {posts.length === 0 && (
                    <ListItem>
                        <ListItemText primary="No posts available." />
                    </ListItem>
                )}
                {posts.map((post, idx) => (
                    <Box key={post.id}>
                        <ListItem
                            alignItems="flex-start"
                            sx={{
                                bgcolor: "#fff",
                                borderRadius: 2,
                                boxShadow: 1,
                                mb: 2,
                                transition: "box-shadow 0.2s",
                                "&:hover": {
                                    boxShadow: 4,
                                    bgcolor: "#f0f4ff",
                                },
                                px: 2,
                                py: 2,
                            }}
                            secondaryAction={
                                editingPostId !== post.id && (
                                    <Stack direction="row" spacing={1}>
                                        <IconButton
                                            edge="end"
                                            color="primary"
                                            onClick={() => startEditing(post)}
                                            aria-label="edit"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            color="error"
                                            onClick={() => onDelete(post.id)}
                                            aria-label="delete"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                )
                            }
                        >
                            <Avatar sx={{ bgcolor: "#3f51b5", mr: 2 }}>
                                <ArticleIcon />
                            </Avatar>
                            {editingPostId === post.id ? (
                                <Box width="100%">
                                    <Typography variant="subtitle2" color="textSecondary">
                                        ID: {post.id}
                                    </Typography>
                                    <Typography variant="h6" sx={{ mb: 1 }}>
                                        {post.title}
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        label="Title"
                                        sx={{ mb: 1 }}
                                    />
                                    <TextField
                                        fullWidth
                                        multiline
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        label="Content"
                                        sx={{ mt: 1 }}
                                    />
                                    <Box mt={2} display="flex" gap={2}>
                                        <Button
                                            startIcon={<SaveIcon />}
                                            variant="contained"
                                            color="primary"
                                            onClick={saveEdit}
                                            sx={{ minWidth: 100 }}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            startIcon={<CancelIcon />}
                                            variant="outlined"
                                            color="secondary"
                                            onClick={cancelEdit}
                                            sx={{ minWidth: 100 }}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </Box>
                            ) : (
                                <ListItemText
                                    primary={
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <Typography variant="subtitle2" color="textSecondary">
                                                ID: {post.id}
                                            </Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {post.title}
                                            </Typography>
                                        </Stack>
                                    }
                                    secondary={
                                        <Typography variant="body1" sx={{ color: "#333", mt: 0.5 }}>
                                            {post.content}
                                        </Typography>
                                    }
                                />
                            )}
                        </ListItem>
                        {idx < posts.length - 1 && <Divider />}
                    </Box>
                ))}
            </List>
        </Paper>
    );
}
