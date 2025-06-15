import { useState } from "react";
import { Paper, List, ListItem, ListItemText, Typography, Pagination, Box } from "@mui/material";
import PostItem from "./PostItem";

const POSTS_PER_PAGE = 3;

export default function PostList({ posts, onDelete, onEdit }) {
    const [editingPostId, setEditingPostId] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [page, setPage] = useState(1);

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

    // Pagination logic
    const pageCount = Math.ceil(posts.length / POSTS_PER_PAGE);
    const paginatedPosts =
        posts.length > POSTS_PER_PAGE
            ? posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)
            : posts;

    const handlePageChange = (_, value) => setPage(value);

    return (
        <Paper
            elevation={4}
            sx={{
                maxWidth: "100vw",
                margin: "10px auto",
                borderRadius: 3,
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                p: 1,
            }}
        >
            {/* <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, textAlign: "center", color: "#3f51b5" }}>
                Posts
            </Typography> */}
            <List>
                {posts.length === 0 ? (
                    <ListItem>
                        <ListItemText primary="No posts available." />
                    </ListItem>
                ) : (
                    paginatedPosts.map((post) => (
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
            {posts.length > POSTS_PER_PAGE && (
                <Box display="flex" justifyContent="center" mt={.5}>
                    <Pagination
                        count={pageCount}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>
            )}
        </Paper>
    );
}
