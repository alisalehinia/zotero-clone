import { Colors } from "styles/theme";
import { Box, styled } from "@mui/material";
import Accordion from '@mui/material/Accordion';

export const MainContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    maxWidth: "xl"
}))
export const SideBar = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? Colors.darkPrimary : Colors.primary,
    width: "25%"
}))
export const HomeContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? Colors.darkPrimary : Colors.primary,
    width: "100%",
    height: "100%",
    display: "flex",
}))
export const LeftSideAccordionLibrary = styled(Accordion)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? Colors.darkGray : Colors.gray,
}))
export const LeftSideAccordionCollection = styled(Accordion)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? Colors.darkCollection : Colors.Collection,
}))