import { useEffect, useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material"
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
import { toast } from "react-hot-toast";

import { fetchUserLibraries } from "store/library/library-actions";
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { fetchLibraryCollections } from "store/collection/collection-actions";
import CollectionTree from "@/components/treeView/CollectionTree";


const Home = () => {
    const { locale, locales, push } = useRouter();
    const { attachments, setAttachments } = useAttachmentContext();

    const dispatch = useDispatch();

    const libraries = useSelector((state) => state.library.libraries);
    const loading = useSelector((state) => state.library.loading);
    const error = useSelector((state) => state.library.error);

    const [selectedLibrary, setSelectedLibrary] = useState("");

    const collections = useSelector((state) => state.collection.library);
    const loadingCollections = useSelector((state) => state.collection.loading);
    const errorCollections = useSelector((state) => state.collection.error);


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
                    {libraries.map((library) => {
                        // dispatch.fetchLibraryCollections(library._id)
                        return (
                            <TreeView key={library._id}
                                defaultCollapseIcon={<ExpandMoreIcon />}
                                defaultExpandIcon={<ChevronRightIcon />}
                            >
                                <TreeItem key={library._id} nodeId={library._id} label={library.name} onClick={() => dispatch(fetchLibraryCollections(library._id))}>
                                    {
                                        // collections[`${library._id}`].map((collection) => {
                                        //     return (
                                        //         <TreeItem key={collection._id}

                                        //             nodeId={collection._id}
                                        //             node={collection._id}
                                        //             label={collection.name}
                                        //         >
                                        //         </TreeItem>
                                        //     )
                                        // })



                                        <CollectionTree libraryId={library._id} />
                                        // <TreeItem key={1} nodeId={1} label={1} />
                                    }
                                </TreeItem>
                            </TreeView>
                        )
                    })}

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