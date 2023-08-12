import { Box, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import http from 'services/httpService'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import GroupsIcon from '@mui/icons-material/Groups';
import Image from 'next/image';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        http.get('/users/me').then((res) => {
            setUser(res.data.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    if (!user) return <CircularProgress />
    //  
    return (
        <>
            <Box sx={{ width: "50vw", marginX: "auto", padding: "10px", height: "80vh" }}>
                {user && <Image src={`http://localhost:5000/api/profiles/${user.email}.jpg`} alt="user profile picture" width={100} height={100} />}
                <Box sx={{ backgroundColor: "white", color: "#444", padding: "10px", borderRadius: "10px", }}>
                    <Box sx={{ display: "flex", backgroundColor: "#f1f5f9", padding: "10px", borderRadius: "10px", gap: "10px", marginBottom: "8px" }}>
                        <PersonIcon />
                        <Box>name</Box>
                        <Box>
                            {user.name}
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", backgroundColor: "#f1f5f9", padding: "10px", borderRadius: "10px", gap: "10px", marginBottom: "8px" }}>
                        <EmailIcon />
                        <Box>email</Box>
                        <Box>
                            {user.email}
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", backgroundColor: "#f1f5f9", padding: "10px", borderRadius: "10px", gap: "10px" }}>
                        <GroupsIcon />
                        <Box>role</Box>
                        <Box>
                            {user.role}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Profile