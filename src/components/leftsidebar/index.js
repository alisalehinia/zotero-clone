import React, { useEffect, useState } from 'react'
import http from 'services/httpService'
import LibraryAccordion from '../accordion/library';
import FormDialog from '../formDialog/addLibrary';
import { useLibraryContext } from '@/context/LibraryContext';
import { Box, Typography } from "@mui/material"

const LeftSideBarComponent = () => {
    const { libraries, setLibraries } = useLibraryContext();

    const fetchLibraries = async () => {
        const res = await http.get("/libraries");
        console.log(res.data.data);
        setLibraries(res.data.data)
    }

    useEffect(() => {
        fetchLibraries();
    }, [])


    return (
        <Box sx={{ p: "2px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <Typography variant="h4">My Libraries</Typography>
                <FormDialog text="New Library" fetchLibraries={fetchLibraries} />
            </Box>
            {
                libraries.map((library) => {
                    return <LibraryAccordion
                        key={library._id}
                        libraryId={library._id}
                        primaryText={library.name}
                        secondaryText={library.private ? "private" : "public"}
                        fetchLibraries={fetchLibraries}
                        content={"library"} />
                })
            }
        </Box>
    )
}

export default LeftSideBarComponent