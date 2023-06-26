import { ExpandMoreIcon, ChevronRightIcon } from "@mui/icons-material"

import { TreeItem, TreeView } from '@mui/lab'
import { Box, CircularProgress, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchLibraryCollections } from "store/collection/collection-actions";
import ItemTree from "./ItemTree";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { fetchCollectionItems } from "store/item/item-actions";
import UpdateCollectionFormDialog from "../formDialog/updateCollection";

const CollectionTree = ({ libraryId }) => {
    //! menu states
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                <div key={collection._id} className='w-full flex items-start justify-start'>
                    <div className='flex-grow mt-2'>
                        <TreeItem key={collection._id}

                            nodeId={collection._id}
                            node={collection._id}
                            label={collection.name}
                            onClick={() => dispatch(fetchCollectionItems(collection._id))}
                        >
                            <ItemTree collectionId={collection._id} />
                        </TreeItem>
                    </div>
                    <Box>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}

                        >
                            {/* //! update collection */}
                            <MenuItem>
                                <UpdateCollectionFormDialog text="update collection" libraryId={libraryId} collectionId={collection._id} menuClose={handleClose} />
                            </MenuItem>
                            {/* //! add new item */}
                            <MenuItem>add new item</MenuItem>
                            {/* //! delete collection */}
                            <MenuItem>delete</MenuItem>
                        </Menu>
                    </Box>
                </div>
            )
        })
    )
}

export default CollectionTree