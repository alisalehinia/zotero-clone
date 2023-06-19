import LeftSideBar from "@/components/leftsidebar";
import { useState } from "react";
import { Box } from "@mui/material"
import { HomeContainer, MainContainer, MiddleContainer, SideBar } from "styles/body";
import http from "services/httpService";
import { useRouter } from "next/router";
import Link from "next/link";
import FileStructureMobile from "@/components/formDialog/fileStractureMobile";
import { useItemContext } from "@/context/ItemContext";
import { useAttachmentContext } from "@/context/AttachmentContext";
import MiddleContainerComponent from "@/components/mainContainer";

const Home = () => {
    const { locale, locales, push } = useRouter();
    const { attachments, setAttachments } = useAttachmentContext();
    return (
        <HomeContainer>
            {/* //! left sidebar */}
            <SideBar>
                <LeftSideBar />
            </SideBar>

            {/* //! middle container */}
            <MiddleContainer>
                <FileStructureMobile />
                <MiddleContainerComponent />
            </MiddleContainer>
            {/* //! right sidebar */}
            <SideBar>
                3
            </SideBar>
        </HomeContainer>
    );
}

export default Home;