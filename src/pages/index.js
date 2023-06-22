import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material"
import { HomeContainer, LeftSideBar, MainContainer, MiddleContainer, RightSideBar, SideBar } from "styles/body";
import http from "services/httpService";
import { useRouter } from "next/router";
import Link from "next/link";
import FileStructureMobile from "@/components/formDialog/fileStractureMobile";
import { useItemContext } from "@/context/ItemContext";
import { useAttachmentContext } from "@/context/AttachmentContext";
import MiddleContainerComponent from "@/components/mainContainer";
import LeftSideBarComponent from "@/components/leftsidebar";
import { useDispatch, useSelector } from "react-redux";
import LibraryTree from "@/components/treeView/libraryTree";

import { fetchUserLibraries } from "store/library/library-actions";
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Home = () => {
    const { locale, locales, push } = useRouter();
    const { attachments, setAttachments } = useAttachmentContext();

    const dispatch = useDispatch();
    const libraries = useSelector((state) => state.library.libraries);
    const loading = useSelector((state) => state.library.loading);
    const error = useSelector((state) => state.library.error);

    useEffect(() => {
        dispatch(fetchUserLibraries());
    }, [dispatch]);

    if (loading) {
        return <CircularProgress />
    }

    if (error) {
        toast.error(error);
        return;
    }

    return (
        <HomeContainer>
            {/* //! left sidebar */}
            <LeftSideBar>
                {/* <LeftSideBarComponent /> */}
                {/* //? render all libraries of user */}
                <div>
                    {loading && <CircularProgress />}
                    <TreeView
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                    >
                        {libraries.map((library) => (
                            <TreeItem key={library.id} nodeId={library.id} label={library.name}>
                                1
                            </TreeItem>
                        ))}
                    </TreeView>
                </div>

            </LeftSideBar>

            {/* //! middle container */}
            <MiddleContainer>
                <FileStructureMobile />
                <MiddleContainerComponent />
            </MiddleContainer>
            {/* //! right sidebar */}
            <RightSideBar>
                3
            </RightSideBar>
        </HomeContainer>
    );
}

export default Home;