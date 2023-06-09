import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import http from 'services/httpService';
import { toast } from 'react-hot-toast';
import FormDialog from '../formDialog/addItem';
import UpdateCollectionFormDialog from '../formDialog/updateCollection';
import UpdateItemFormDialog from '../formDialog/updateItem';
import { useItemContext } from '@/context/ItemContext';
import { LeftSideAccordion, LeftSideAccordionCollection } from 'styles/body';
import { Box } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Colors } from 'styles/theme';

export default function CollectionAccordion({ primaryText, secondaryText, content, collectionId, fetchLibraryCollections, libraryId }) {
    const [expanded, setExpanded] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

    const { items, setItems } = useItemContext();


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        fetchCollItems(collectionId);
    };

    const fetchCollItems = async (collectionId) => {
        try {
            const res = await http.get(`/collections/${collectionId}/items`);
            console.log("fetch items ", res.data.data);
            setItems(res.data.data)

        } catch (error) {
            console.log("fetch items ", error);
            toast.error(error)
        }
    }

    const deleteCollection = async (collectionId) => {
        try {
            const res = await http.delete(`/collections/${collectionId}`);
            fetchLibraryCollections(libraryId);
            console.log("delete collection successful", res);
        } catch (error) {
            console.log("delete collection fail", error);
        }
    }

    const deleteItem = async (itemId) => {
        try {
            const res = await http.delete(`/items/${itemId}`);
            console.log("item delete success", res);
            toast.success("item deleted")
            fetchCollItems(collectionId);
        } catch (error) {
            console.log("delete item fail");
        }
    }


    return (
        <Box sx={{ marginBottom: "4px" }}>
            <LeftSideAccordionCollection expanded={expanded === primaryText} onChange={handleChange(primaryText)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={primaryText}
                    id={primaryText}
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        {primaryText}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{secondaryText}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}>
                            <MenuItem>
                                <UpdateCollectionFormDialog text="update col Info" collectionId={collectionId}
                                    libraryId={libraryId}
                                    fetchLibraryCollections={fetchLibraryCollections} />
                            </MenuItem>
                            <MenuItem>
                                <FormDialog text="add item" collectionId={collectionId} fetchCollectionItems={() => fetchCollItems(collectionId)} />
                            </MenuItem>
                        </Menu>
                        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                            {/* //!open menu Button */}
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
                            {/* //! delete collection  */}
                            <IconButton aria-label="delete">
                                <DeleteIcon onClick={() => {
                                    setDeleteDialogOpen(true);
                                }} />
                            </IconButton>
                        </Box>
                        {items.length > 0 && items.map((item) => {
                            return <><div className='ml-2 border' key={item._id}>{item.name}</div>
                                <UpdateItemFormDialog text="update item" itemId={item._id} collectionId={collectionId} fetchCollectionItems={() => fetchCollItems(collectionId)} />
                                <button onClick={() => deleteItem(item._id)}>delete item</button>
                            </>
                        })}
                    </Typography>
                </AccordionDetails>
            </LeftSideAccordionCollection>
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete a collection?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Cancel to close window
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setDeleteDialogOpen(false) }}>cancel</Button>
                    <Button sx={{ color: Colors.danger }} onClick={() => {
                        deleteCollection(collectionId);
                        setDeleteDialogOpen(false);
                    }} autoFocus>
                        delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}