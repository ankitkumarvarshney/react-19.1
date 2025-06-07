import { Box, Button, TextField, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

export default function PostEditForm({
    post,
    editTitle,
    editContent,
    setEditTitle,
    setEditContent,
    onSave,
    onCancel
}) {
    return (
        <Box width="100%">
            <Typography variant="subtitle2" color="textSecondary">ID: {post.id}</Typography>
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
                    onClick={onSave}
                    sx={{ minWidth: 100 }}
                >
                    Save
                </Button>
                <Button
                    startIcon={<CancelIcon />}
                    variant="outlined"
                    color="secondary"
                    onClick={onCancel}
                    sx={{ minWidth: 100 }}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
}
