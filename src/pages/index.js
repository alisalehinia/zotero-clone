import LeftSideBar from "@/components/leftsidebar";
import { useState } from "react";
import { Box } from "@mui/material"
import { HomeContainer, SideBar } from "styles/body";
import http from "services/httpService";
import { useRouter } from "next/router";
import Link from "next/link";
import FileStructureMobile from "@/components/formDialog/fileStractureMobile";

const Home = () => {
    const { locale, locales, push } = useRouter();

    const addAttachment = () => {
        http.get("/attachmentTypes").then((res) => {
            console.log(res.data.data);
        }).catch((err) => console.log(err));
    }
    return (
        <HomeContainer>
            {/* //! left sidebar */}
            <SideBar>
                <LeftSideBar />
            </SideBar>

            {/* //! main container */}
            <div className="w-1/2 rounded p-1">
                <FileStructureMobile />
                <button onClick={addAttachment} >add attachment type</button>
            </div>
            {/* //! right sidebar */}
            <SideBar>
                3
            </SideBar>
        </HomeContainer>
    );
}

export default Home;