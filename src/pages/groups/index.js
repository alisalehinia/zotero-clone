import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import http from 'services/httpService'

import GroupIcon from '@mui/icons-material/Group';
import CreateGroupDialog from '@/components/formDialog/createGroup';
import LibraryTree from '@/components/treeView/libraryTree';

const GroupsPage = () => {

    const [userGroups, setUserGroups] = useState([]);

    const [selectedGroup, setSelectedGroup] = useState(null);
    const [groupLibraries, setGroupLibraries] = useState([]);

    useEffect(() => {
        http.get(`/groups`).then((res) => setUserGroups(res.data.data)).catch((err) => console.log(err))
        {
            selectedGroup && http.get(`/libraries?group=${selectedGroup}`).then((res) => {
                setGroupLibraries(res.data.data)
            }).catch((err) => console.log(err))
        }

    }, [selectedGroup])
    console.log(userGroups);
    return (<Box sx={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <Box sx={{ backgroundColor: "#0f172a", height: "90vh", padding: "8px" }}>
            <Box
                sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <Typography sx={{ padding: "8px" }} >My Groups</Typography >
                <CreateGroupDialog />
            </Box>
            <Box >
                {
                    userGroups.map(group => (
                        <Box key={group._id} sx={{
                            display: "flex",
                            borderRadius: "10px",
                            margin: "4px",
                            padding: "6px",
                            alignItems: "center",
                            justifyContent: "space-between",
                            border: "1px solid #ccc",
                            marginBottom: "8px",
                            backgroundColor: "#1e293b",
                            cursor: "pointer"
                        }}
                            onClick={() => {
                                setSelectedGroup(group._id);
                                console.log(group._id);
                            }}
                        >
                            <Box>
                                <GroupIcon />
                            </Box>
                            <Box>{group.name}</Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "2px" }}>
                                <Box>members: {" "}</Box>
                                <Box>{group.members.length}</Box>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "2px" }}>
                                <Box>owner:{" "}</Box>
                                <Box>{group.owner.name}</Box>
                            </Box>
                        </Box>
                    ))
                }
            </Box>
        </Box>
        <Box sx={{ backgroundColor: "#0f172a", height: "90vh", padding: "8px" }}>
            {
                groupLibraries.length > 0 ? groupLibraries.map((library) => (
                    <LibraryTree key={library._id} groupLibs={groupLibraries} />
                )) : <Box sx={{ textAlign: "center" }}>no libraries in group</Box>
            }
        </Box>
    </Box>
    )
}

export default GroupsPage