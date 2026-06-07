import { ListItem, Box, Stack, IconButton, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PostDisplay from "./PostDisplay";
import useAuth from "../../hooks/useAuth";
import PostEditForm from "./PostEditForm";

export default function PostItem({
    post,
    isEditing,
    onEditStart,
    onDelete,
    onEditSave,
    onEditCancel,
    editTitle,
    editContent,
    setEditTitle,
    setEditContent
}) {
    const { user } = useAuth();
    return (
        <Box>
            <ListItem
                alignItems="flex-start"
                sx={{
                    bgcolor: "#fff",
                    borderRadius: 2,
                    boxShadow: 1,
                    mb: 2,
                    px: 2,
                    py: 2,
                    transition: "box-shadow 0.2s",
                    "&:hover": {
                        boxShadow: 4,
                        bgcolor: "#f0f4ff",
                    },
                }}
                secondaryAction={
                    !isEditing && user && post.user && String(user.id) === String(post.user.id) && (
                        <Stack direction="row" spacing={1}>
                            <IconButton color="primary" onClick={() => onEditStart(post)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="error" onClick={() => onDelete(post.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Stack>
                    )
                }
            >
                {isEditing ? (
                    <PostEditForm
                        post={post}
                        editTitle={editTitle}
                        editContent={editContent}
                        setEditTitle={setEditTitle}
                        setEditContent={setEditContent}
                        onSave={onEditSave}
                        onCancel={onEditCancel}
                    />
                ) : (
                    <PostDisplay post={post} />
                )}
            </ListItem>
            <Divider />
        </Box>
    );
}
