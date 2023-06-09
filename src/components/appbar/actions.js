import { FavoriteRounded, PersonRounded, ShoppingCartRounded } from "@mui/icons-material"
import { Divider, ListItemButton, ListItemIcon } from "@mui/material"
import { ActionIconsContainerDesktop, ActionIconsContainerMobile, MyList } from "../../../styles/appbar"
import { Colors } from "../../../styles/theme/index";

export default function Actions({ matches }) {
    const Component = matches ? ActionIconsContainerMobile : ActionIconsContainerDesktop;

    return (
        <Component>
            <MyList type="row">
                <ListItemButton sx={{ justifyContent: "center" }}>
                    <ListItemIcon sx={{ display: "flex", justifyContent: "center", color: matches && Colors.secondary }}>
                        <ShoppingCartRounded />
                    </ListItemIcon>
                </ListItemButton>
                <Divider orientation="vertical" flexItem />
                <ListItemButton sx={{ justifyContent: "center" }}>
                    <ListItemIcon sx={{ display: "flex", justifyContent: "center", color: matches && Colors.secondary }}>
                        <FavoriteRounded />
                    </ListItemIcon>
                </ListItemButton>
                <Divider orientation="vertical" flexItem />
                <ListItemButton sx={{ justifyContent: "center" }}>
                    <ListItemIcon sx={{ display: "flex", justifyContent: "center", color: matches && Colors.secondary }}>
                        <PersonRounded />
                    </ListItemIcon>
                </ListItemButton>
                <Divider orientation="vertical" flexItem />
            </MyList>
        </Component>
    )
}