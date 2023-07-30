import { useEffect, useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material"
import { HomeContainer, LeftSideBar, LeftSideBarTagContainer, MainContainer, MiddleContainer, RightSideBar, SideBar } from "styles/body";
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
import { toast } from "react-hot-toast";

import { fetchUserLibraries } from "store/library/library-actions";
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { fetchLibraryCollections } from "store/collection/collection-actions";
import CollectionTree from "@/components/treeView/CollectionTree";
import AddLibraryDialog from "@/components/formDialog/addLibrary";
import Notes from "@/components/rightsidebar/Notes";
import { useUIContext } from "@/context/ui";
import TagBox from "@/components/leftsidebar/tagBox";


const Home = () => {
    const { locale, locales, push } = useRouter();
    const { attachments, setAttachments } = useAttachmentContext();

    const { selectedItem, selectedCollection } = useUIContext();

    useEffect(() => {
        // console.log(selectedCollection);
        http.get("/tags").then((res) => console.log("tags", res)).catch((err) => console.log(err))
    }, [])
    return (
        <HomeContainer>
            {/* //! left sidebar */}

            <Box sx={{ width: "25vw" }}>
                <LeftSideBar>
                    <AddLibraryDialog text="new library" />
                    <LibraryTree />
                </LeftSideBar>
                <LeftSideBarTagContainer >
                    <TagBox />
                </LeftSideBarTagContainer>
            </Box>

            {/* //! middle container */}
            <MiddleContainer>
                <FileStructureMobile />
                <MiddleContainerComponent />
            </MiddleContainer>
            {/* //! right sidebar */}
            <RightSideBar>
                {(selectedItem || selectedCollection) && <Notes itemId={selectedItem} collectionId={selectedCollection} />}
            </RightSideBar>
        </HomeContainer>
    );
}

export default Home;
