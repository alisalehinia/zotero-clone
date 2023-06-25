import { ExpandMoreIcon, ChevronRightIcon } from "@mui/icons-material"

import { TreeItem, TreeView } from '@mui/lab'
import { CircularProgress } from "@mui/material";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchLibraryCollections } from "store/collection/collection-actions";
import ItemTree from "./ItemTree";
import { fetchCollectionItems } from "store/item/item-actions";

const CollectionTree = ({ libraryId }) => {

    const collections = useSelector((state) => state.collection.library);
    const loading = useSelector((state) => state.collection.loading);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLibraryCollections(libraryId))
    }, [libraryId, dispatch])

    if (loading) {
        return (
            <CircularProgress />
        )
    }
    return (
        collections[libraryId].map((collection) => {
            return (
                <TreeItem key={collection._id}

                    nodeId={collection._id}
                    node={collection._id}
                    label={collection.name}
                    onClick={() => dispatch(fetchCollectionItems(collection._id))}
                >
                    <ItemTree collectionId={collection._id} />
                </TreeItem>
            )
        })
    )
}

export default CollectionTree