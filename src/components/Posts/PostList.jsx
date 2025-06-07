import { useState } from "react";
import { Paper, List, ListItem, ListItemText, Typography } from "@mui/material";
import PostItem from "./PostItem";

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
                {posts.length === 0 ? (
                    <ListItem>
                        <ListItemText primary="No posts available." />
                    </ListItem>
                ) : (
                    posts.map((post) => (
                        <PostItem
                            key={post.id}
                            post={post}
                            isEditing={editingPostId === post.id}
                            onEditStart={startEditing}
                            onDelete={onDelete}
                            onEditSave={saveEdit}
                            onEditCancel={cancelEdit}
                            editTitle={editTitle}
                            editContent={editContent}
                            setEditTitle={setEditTitle}
                            setEditContent={setEditContent}
                        />
                    ))
                )}
            </List>
        </Paper>
    );
}
