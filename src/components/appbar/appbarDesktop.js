import { SearchRounded } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useUIContext } from "../../context/ui";
import { AppbarContainer, AppbarHeader, DarkModeSwitch, MyList } from "../../../styles/appbar/index";
import Actions from "./actions";
import Link from "next/link";
import Button from '@mui/material/Button';
import { useAuth } from "@/context/AuthContext";


export default function AppbarDesktop({ matches, darkMode, toggleTheme }) {

    const { setShowSearchBox } = useUIContext();

    const { user } = useAuth();

    return (
        <AppbarContainer>
            <AppbarHeader>
                zotero
            </AppbarHeader>
            <MyList type="row">
                <Link href="/">
                    <ListItemText primary="Home" sx={{ cursor: "pointer" }} />
                </Link>
                {!user && <> <Link href="/login">
                    <ListItemText sx={{ cursor: "pointer" }} primary="Login" />
                </Link>
                    <Link href="/signup">
                        <ListItemText sx={{ cursor: "pointer" }} primary="Sign up" />
                    </Link> </>}
                <ListItemText sx={{ cursor: "pointer" }} primary="Groups" />
                <ListItemButton>
                    <ListItemIcon>
                        <SearchRounded onClick={() => setShowSearchBox(true)} />
                    </ListItemIcon>
                </ListItemButton>
            </MyList>
            <DarkModeSwitch checked={darkMode} sx={{ m: 1 }} onChange={toggleTheme} value={darkMode} />
            <Actions matches={matches} />
        </AppbarContainer>
    )
}