import { useMediaQuery, useTheme } from "@mui/material";
import AppbarDesktop from "./appbarDesktop";
import AppbarMobile from "./appbarMobile";

export default function Appbar({ toggleTheme }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            {matches ? <AppbarMobile matches={matches} toggleTheme={toggleTheme} /> : <AppbarDesktop matches={matches} toggleTheme={toggleTheme} />}
        </>
    )
}