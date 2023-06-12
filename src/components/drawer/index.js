import { CloseRounded } from "@mui/icons-material";
import { Button, Divider, Drawer, List, ListItemButton, ListItemText, styled, useTheme } from "@mui/material";
import { lighten } from "polished";
import { useUIContext } from "../../context/ui";
import { DarkModeSwitch, DrawerCloseButton } from "../../../styles/appbar";
import { Colors } from "../../../styles/theme";
import Link from "next/link";
import { MainDrawer } from "styles/drawer.js";

export const MiddleDivider = styled((props) => (
    <Divider variant="middle" {...props} />
))``; // => can add css between backticks
export default function AppDrawer({ darkMode, toggleTheme }) {

    const { drawerOpen, setDrawerOpen } = useUIContext();


    return (
        <>
            {drawerOpen
                && <DrawerCloseButton
                    onClick={() => setDrawerOpen(false)} >
                    <CloseRounded sx={{ fontSize: "2.5rem", color: lighten(0.09, Colors.secondary) }} />
                </DrawerCloseButton>}
            <MainDrawer open={drawerOpen}>
                <List>
                    <ListItemButton>
                        <ListItemText>
                            Home
                        </ListItemText>
                    </ListItemButton>
                    <MiddleDivider />
                    <ListItemButton>
                        <ListItemText>
                            <Link href="/login">Login</Link>
                        </ListItemText>
                    </ListItemButton>
                    <MiddleDivider />
                    <ListItemButton>
                        <ListItemText>
                            <Link href="/signup">Signup</Link>
                        </ListItemText>
                    </ListItemButton>
                    <MiddleDivider />
                    <ListItemButton>
                        <ListItemText>
                            <Link href="/groups">Groups</Link>
                        </ListItemText>
                    </ListItemButton>
                    <MiddleDivider />
                    <ListItemButton>
                        <DarkModeSwitch checked={darkMode} sx={{ m: 1 }} onChange={() => {
                            toggleTheme()
                            setDrawerOpen(false)
                        }} value={darkMode} />
                    </ListItemButton>
                    <MiddleDivider />
                </List>
            </MainDrawer>
        </>

    )
}