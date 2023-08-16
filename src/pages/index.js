import { Translate } from '@mui/icons-material'
import { Box, Button, Typography, styled } from '@mui/material'
import Link from 'next/link'
import React from 'react'

import GroupsIcon from '@mui/icons-material/Groups';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import TagIcon from '@mui/icons-material/Tag';
import GitHubIcon from '@mui/icons-material/GitHub';

const HomeContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#0f172a' : '#f1f5f9',
}))
const Hero = styled(Box)(({ theme }) => ({
    backgroundImage: '  linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.8)), url("hero.jpg")',
    backgroundSize: "cover",
    height: '85vh',
    position: "relative",
    marginBottom: "80px"

}))
const HeaderBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: 'translate(-40%,-40%)',
}))
const CTAButton = styled(Button)(({ theme }) => ({
    borderRadius: "8px",
    color: "#fff",
    padding: "8px 16px",
    margin: "15px auto",
    backgroundColor: "#0f172a"
}))

const Home = () => {
    return (
        <HomeContainer>
            <Hero>
                <HeaderBox>
                    <Typography variant="h2" sx={{
                        fontSize: "60px",
                        fontWeight: "300",
                        color: "#fff"
                    }}> Your personal
                        research assistant</Typography>
                    <Link href="/app">
                        <CTAButton variant='contained'>Try Now !</CTAButton>
                    </Link>
                </HeaderBox>
            </Hero>
            <Box sx={{ marginBottom: "30px" }}>
                <Typography variant="h3" sx={{
                    fontSize: "20px",
                    fontWeight: "400",
                    padding: "12px",
                    marginBottom: "40px"
                }}
                    textAlign={"center"}>Zotero is an open source platform that helps researchers manage their references well.</Typography>

                <Box sx={{
                    margin: "0 auto", width: "95%", display: "flex", flexWrap: "wrap", gapX: "10px", gapY: "20px",
                    justifyContent: "space-around",
                }}>
                    <Box sx={{ width: "300px", textAlign: "center", marginBottom: "20px" }}>
                        <GroupsIcon sx={{ fontSize: "200px", marginBottom: "10px" }} />
                        <Typography sx={{ marginBottom: "20px" }} variant="h4">Collaborate freely</Typography>
                        <Typography variant='p'>
                            Zotero lets you co-write a paper with a colleague, distribute course materials to students, or build a collaborative bibliography. You can share a Zotero library with as many people you like, at no cost.
                        </Typography>
                    </Box>
                    <Box sx={{ width: "300px", textAlign: "center", marginBottom: "20px" }}>
                        <PhoneAndroidIcon sx={{ fontSize: "200px", marginBottom: "10px" }} />
                        <Typography sx={{ marginBottom: "20px" }} variant="h4">every where access</Typography>
                        <Typography variant='p'>
                            by accessing to fully responsive web app and of course the android application you can access your files every where.
                        </Typography>
                    </Box>
                    <Box sx={{ width: "300px", textAlign: "center", marginBottom: "20px" }}>
                        <TagIcon sx={{ fontSize: "200px", marginBottom: "10px" }} />
                        <Typography sx={{ marginBottom: "20px" }} variant="h4">Organize your way</Typography>
                        <Typography variant='p'>
                            Zotero helps you organize your research any way you want. You can sort items into collections and tag them with keywords. Or create saved searches that automatically fill with relevant materials as you work.
                        </Typography>
                    </Box>
                    <Box sx={{ width: "300px", textAlign: "center", marginBottom: "20px" }}>
                        <GitHubIcon sx={{ fontSize: "200px", marginBottom: "10px" }} />
                        <Typography sx={{ marginBottom: "20px" }} variant="h4">Rest easy</Typography>
                        <Typography variant='p'>
                            Zotero is open source and developed by an independent, nonprofit organization that has no financial interest in your private information. With Zotero, you always stay in control of your own data.
                        </Typography>
                    </Box>
                </Box>
            </Box>
            {/* footer */}
            <Box sx={{ width: "100%", borderTop: "1px solid" }}>
                <Box sx={{ display: "flex" }}>
                    <Box sx={{ margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "20px", padding: "8px 16px", fontSize: "17px", flexGrow: "1" }} >
                        <Box>github repo</Box>
                        <Box>privacy</Box>
                        <Box>Terms of Service</Box>
                        <Box>developers</Box>
                    </Box>
                    <Box sx={{ fontSize: "20px", padding: "8px 16px" }}>download mobile application</Box>
                </Box>
                <Box sx={{ padding: "8px 16px", marginTop: "40px", textAlign: "center", paddingBottom: "20px" }}>Zotero is a project of the Corporation for Digital Scholarship, a nonprofit organization dedicated to the development of software and services for researchers and cultural heritage institutions, and is developed by a global community.</Box>
            </Box>
        </HomeContainer>
    )
}
export default Home