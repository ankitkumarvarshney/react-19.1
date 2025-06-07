import { ListItemText, Typography, Stack } from "@mui/material";

export default function PostDisplay({ post }) {
    return (
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
    );
}
