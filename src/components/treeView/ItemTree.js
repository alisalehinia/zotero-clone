import { useAttachmentContext } from "@/context/AttachmentContext";
import { TreeItem } from "@mui/lab"
import { Box, CircularProgress, IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import http from "services/httpService";
import { fetchCollectionItems } from "store/item/item-actions";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { Colors } from "styles/theme";
import UpdateItemFormDialog from "../formDialog/updateItem";


const ItemTree = ({ collectionId }) => {
    const { attachments, setAttachments } = useAttachmentContext();

    const items = useSelector((state) => state.item.itemsOfCollections);
    const loading = useSelector((state) => state.item.loading);

    const dispatch = useDispatch();
    // ! selected item to delete
    const [itemToDelete, setItemToDelete] = useState();
    //! menu states
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event, item) => {
        setAnchorEl(event.currentTarget);
        setItemToDelete(item);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setItemToDelete(null);
    };

    useEffect(() => {
        dispatch(fetchCollectionItems(collectionId))
    }, [collectionId, dispatch])

    if (loading) {
        return (
            <CircularProgress />
        )
    }

    const func = (id) => {
        http.get(`/items/${id}/attachments`).then((res) => {
            setAttachments(res.data.data);
        }).catch((err) => console.log(err))
    }

    return (
        items[collectionId].map((item) => {
            return (
                <div key={item._id} className='w-full flex items-start justify-start'>
                    <div className='flex-grow mt-2'>
                        <TreeItem key={item._id}

                            nodeId={item._id}
                            node={item._id}
                            label={item.name}
                            onClick={() => func(item._id)}
                        />
                    </div>
                    <Box>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={(event) => handleMenuClick(event, item)}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id={`long-menu-${item._id}`}
                            MenuListProps={{
                                'aria-labelledby': `long-button-${item._id}`,
                            }}
                            anchorEl={anchorEl}
                            open={open && itemToDelete === item}
                            onClose={handleClose}

                        >
                            {/* //! update item */}
                            <MenuItem>
                                <UpdateItemFormDialog text="update item" itemId={item._id} collectionId={collectionId} menuClose={handleClose} />
                            </MenuItem>
                            {/* //! add new attachment */}
                            <MenuItem>3</MenuItem>
                            {/* //! add note*/}
                            <MenuItem>3</MenuItem>
                            {/* //! delete */}
                            <MenuItem>3</MenuItem>
                        </Menu>
                    </Box>
                </div>
            )
        })
    )
}

export default ItemTree