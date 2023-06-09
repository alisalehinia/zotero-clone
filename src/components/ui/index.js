import { AddRounded, RemoveRounded } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { Colors } from "../../styles/theme"
import { clamp } from "./clamp";

export default function IncDec() {

    const clampV = clamp(1, 10);
    const [value, setValue] = useState(1);

    return (
        <Box display="flex">
            <IconButton
                sx={{
                    borderRadius: 0,
                    background: `${Colors.secondary}`
                }}
                onClick={() => setValue(clampV(value - 1))}>
                <RemoveRounded />
            </IconButton>
            <Typography variant="h6"
                sx={{ border: `1px solid ${Colors.secondary}`, p: 2 }}
            >
                {value}
            </Typography>
            <IconButton
                sx={{
                    borderRadius: 0,
                    background: `${Colors.secondary}`
                }}
                onClick={() => setValue(clampV(value + 1))}>
                <AddRounded />
            </IconButton>
        </Box>
    )
}