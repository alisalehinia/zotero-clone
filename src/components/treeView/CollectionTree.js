import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { Box, Button, Typography } from '@mui/material';
import { useLibraryContext } from '@/context/LibraryContext';
import { useEffect } from 'react';
import http from 'services/httpService';
import { useCollectionContext } from '@/context/CollectionContext';
import { toast } from 'react-hot-toast';

export default function CollectionTree({ collection }) {
    // ! fetch all libraries
    // const { libraries, setLibraries } = useLibraryContext();

    // const fetchLibraries = async () => {
    //     const res = await http.get("/libraries");
    //     console.log(res.data.data);
    //     setLibraries(res.data.data)
    // }

    // useEffect(() => {
    //     fetchLibraries();
    // }, [])
    //!--------------------------------
    //! fetch library's collections
    // const { collections, setCollections } = useCollectionContext();
    // const fetchLibraryCollections = async (libraryId) => {
    //     try {
    //         const res = await http.get(`/libraries/${libraryId}/collections`);
    //         // console.log("fetch collections ", res.data.data);
    //         setCollections(res.data.data)
    //     } catch (error) {
    //         console.log("fetch collections ", error);
    //         toast.error(error)
    //     }
    // }

    // useEffect(() => {
    //     fetchLibraryCollections(library._id)
    // }, [])
    //!--------------------------------

    return (

        <TreeItem key={collection._id} nodeId={collection._id}
            label={<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography>{collection.name}</Typography>
                <Box sx={{ width: "50%" }}>
                    <Button>menu</Button>
                    <Button>delete</Button>
                </Box>
            </Box>}
        >

        </TreeItem>

    );
}