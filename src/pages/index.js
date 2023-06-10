import LeftSideBar from "@/components/leftsidebar";
import { useState } from "react";
import { Box } from "@mui/material"
import { HomeContainer, SideBar } from "styles/body";
import http from "services/httpService";

const Home = () => {

    return (
        <HomeContainer>
            {/* //! left sidebar */}
            <SideBar>
                <LeftSideBar />
            </SideBar>

            {/* //! main container */}
            <div className="w-1/2 rounded p-1">2</div>
            {/* //! right sidebar */}
            <SideBar>
                3
            </SideBar>
        </HomeContainer>
    );
}

export default Home;