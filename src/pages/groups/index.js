import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import http from 'services/httpService'

import GroupIcon from '@mui/icons-material/Group';
import CreateGroupDialog from '@/components/formDialog/createGroup';

const GroupsPage = () => {

    const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
        http.get(`/groups`).then((res) => setUserGroups(res.data.data)).catch((err) => console.log(err))
    }, [])

    return (
        <div className='md:p-4'>
            <div className='flex items-center justify-between mb-4'>
                <h4 className='p-2'>My Groups</h4>
                <CreateGroupDialog />
            </div>
            <div>
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
                            marginBottom: "8px"
                        }}>
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
            </div>
        </div>
    )
}

export default GroupsPage