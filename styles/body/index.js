import { Colors } from "styles/theme";
import { Box, styled } from "@mui/material";

export const MainContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    maxWidth: "xl"
}))