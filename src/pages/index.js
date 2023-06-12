import LeftSideBar from "@/components/leftsidebar";
import { useState } from "react";
import { Box } from "@mui/material"
import { HomeContainer, SideBar } from "styles/body";
import http from "services/httpService";
import { useRouter } from "next/router";
import Link from "next/link";

const Home = () => {
    const { locale, locales, push } = useRouter();
    return (
        <HomeContainer>
            {/* //! left sidebar */}
            <SideBar>
                <LeftSideBar />
            </SideBar>

            {/* //! main container */}
            <div className="w-1/2 rounded p-1">
                <p>{locale}</p>
                {locales.map(l => (
                    <p className="bg-red-300" key={l}>
                        <Link href="/" locale={l}>
                            {l}
                        </Link>
                    </p>
                ))}
            </div>
            {/* //! right sidebar */}
            <SideBar>
                3
            </SideBar>
        </HomeContainer>
    );
}

export default Home;