import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { ItemContainer } from 'styles/body'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateItemFormDialog from '../formDialog/updateItem';
import { Colors } from 'styles/theme';
import AddAttachment from '../formDialog/addAttachment';

const ItemBox = ({ item, collectionId, deleteItem, fetchCollectionItems }) => {
    console.log(open);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

    //! menu data for item
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            <ItemContainer>
                <Box>{item.name}</Box>
                {/* //!menu */}
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >

                    <MenuItem>
                        <UpdateItemFormDialog text="update item" itemId={item.id} menuClose={handleClose} fetchCollectionItems={fetchCollectionItems} collectionId={collectionId} />
                    </MenuItem>
                    <MenuItem>
                        <AddAttachment text="add attachment" itemId={item.id} />
                    </MenuItem>
                    <MenuItem>
                        add note
                    </MenuItem>
                </Menu>
                <Box sx={{ marginBottom: "4px" }}>
                    {/* //!open menu button */}
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
                    <IconButton aria-label="delete">
                        <DeleteIcon onClick={() => {
                            setDeleteDialogOpen(true);
                        }} />
                    </IconButton>
                </Box>
            </ItemContainer>
            {/* //! delete dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete an Item?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Cancel to close window
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setDeleteDialogOpen(false) }}>cancel</Button>
                    <Button sx={{ color: Colors.danger }} onClick={() => {
                        deleteItem(item._id);
                        setDeleteDialogOpen(false);
                    }} autoFocus>
                        delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ItemBox