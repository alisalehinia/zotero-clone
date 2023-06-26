import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import CollectionTree from './CollectionTree';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteLibraryByIdAsync, fetchUserLibraries } from 'store/library/library-actions';
import { fetchLibraryCollections } from 'store/collection/collection-actions';
import { Colors } from 'styles/theme';
import { toast } from 'react-hot-toast';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddLibraryDialog from '../formDialog/addLibrary';
import UpdateLibraryDialog from '../formDialog/updateLibrary';

const LibraryTree = () => {

    // ! delete dialog state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    //! menu states
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


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
    const deleteLibrary = async (id) => {
        await dispatch(deleteLibraryByIdAsync(id));
    }


    return (
        <>
            <Box>
                {loading && <CircularProgress />}
                {libraries.map((library) => {
                    return (
                        <div key={library._id} className='w-full flex items-start justify-start'>
                            <div className='flex-grow mt-2'>
                                <TreeView key={library._id}
                                    defaultCollapseIcon={<ExpandMoreIcon />}
                                    defaultExpandIcon={<ChevronRightIcon />}
                                >
                                    <TreeItem key={library._id}
                                        nodeId={library._id}
                                        label={
                                            <Box sx={{ display: "flex", width: "full", justifyContent: "space-between", alignItems: "center" }}>
                                                <Box>{library.name}</Box>
                                            </Box>
                                        }
                                        onClick={() => dispatch(fetchLibraryCollections(library._id))}
                                    >
                                        {
                                            <CollectionTree libraryId={library._id} />
                                        }
                                    </TreeItem>
                                </TreeView>
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
                                // PaperProps={{
                                //     style: {
                                //         maxHeight: "30vh",
                                //         width: '20ch',
                                //     },
                                // }}
                                >
                                    {/* //! add new library */}
                                    <MenuItem >
                                        <AddLibraryDialog text="new library" />
                                    </MenuItem>
                                    {/* //! update library */}
                                    <MenuItem>
                                        <UpdateLibraryDialog text="update library" libraryId={library._id} menuClose={handleClose} />
                                    </MenuItem>
                                    {/* //! delete library */}
                                    <MenuItem>
                                        <Button onClick={() => {
                                            setDeleteDialogOpen(true);
                                        }}>
                                            <IconButton aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                            <Typography sx={{ color: Colors.danger, fontSize: "12px", width: "100%", height: "100%" }}>delete</Typography>
                                        </Button>
                                        {/* //! delete dialog  */}
                                        <Dialog
                                            open={deleteDialogOpen}
                                            onClose={() => setDeleteDialogOpen(false)}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                                {"Are you sure you want to delete a library?"}
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    Cancel to close window
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={() => { setDeleteDialogOpen(false) }}>cancel</Button>
                                                <Button sx={{ color: Colors.danger }} onClick={() => {
                                                    deleteLibrary(library._id);
                                                    setDeleteDialogOpen(false);
                                                    handleClose()
                                                }} autoFocus>
                                                    delete
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </div>

                    )
                })}
            </Box>

        </>
    )
}

export default LibraryTree