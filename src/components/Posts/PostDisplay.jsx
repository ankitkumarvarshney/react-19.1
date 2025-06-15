import { ListItemText, Typography, Stack, Box } from "@mui/material";

export default function PostDisplay({ post }) {
    return (
        <ListItemText
            primary={
                <Stack direction="row" alignItems="center" spacing={.25}>
                    <Box
                        sx={{
                            background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                            color: "#fff",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "8px",
                            fontWeight: "bold",
                            fontSize: "0.9rem",
                            letterSpacing: 1,
                            boxShadow: 1,
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        ID: {post.id}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {post.title}
                    </Typography>
                </Stack>
            }
            secondary={
                <Typography variant="body1" sx={{ color: "#333", mt: 0.25 }}>
                    {post.content}
                </Typography>
            }
        />
    );
}
