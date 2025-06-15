import { Container, Paper } from "@mui/material";

export default function ContainerWrapper({ children, fullWidth = false }) {
    if (fullWidth) {
        return (
            <Container maxWidth={false} sx={{ mt: 1, width: "100%" }}>
                <Paper sx={{ p: 2 }}>{children}</Paper>
            </Container>
        );
    }
    return (
        <Container maxWidth="sm" sx={{ mt: 6 }}>
            <Paper sx={{ p: 4 }}>{children}</Paper>
        </Container>
    );
}
