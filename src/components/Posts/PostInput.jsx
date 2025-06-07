import { Box, TextField, Button, Paper, Typography, Fade, InputAdornment } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";

export default function PostInput({ newPost, setNewPost, onAdd }) {
    const [focused, setFocused] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFocus = () => setFocused(true);
    const handleBlur = () => setFocused(false);

    const isAddDisabled = !newPost.title?.trim() || !newPost.content?.trim();

    return (
        <Fade in timeout={500}>
            <Paper elevation={2} sx={{ p: 1, mb: 1, borderRadius: 2, bgcolor: "#f5f7fa" }}>
                <Typography variant="subtitle1" mb={1} color="primary" fontWeight={600}>
                    Create a New Post
                </Typography>
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={0.5}
                    component="form"
                    onSubmit={e => { e.preventDefault(); if (!isAddDisabled) onAdd(); }}
                >
                    <TextField
                        fullWidth
                        name="title"
                        label="Title"
                        variant="outlined"
                        value={newPost.title || ""}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AddCircleOutlineIcon color={focused ? "primary" : "disabled"} />
                                </InputAdornment>
                            ),
                        }}
                        autoComplete="off"
                        required
                    />
                    <TextField
                        fullWidth
                        multiline
                        minRows={1}
                        name="content"
                        label="What's on your mind?"
                        variant="outlined"
                        value={newPost.content || ""}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        size="small"
                        autoComplete="off"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isAddDisabled}
                        sx={{
                            minWidth: 100,
                            alignSelf: { xs: "stretch", sm: "flex-end" },
                            height: 32,
                            fontWeight: 600,
                            letterSpacing: 1,
                            boxShadow: 1,
                        }}
                        size="small"
                        endIcon={<AddCircleOutlineIcon />}
                    >
                        Add Post
                    </Button>
                </Box>
            </Paper>
        </Fade>
    );
}
