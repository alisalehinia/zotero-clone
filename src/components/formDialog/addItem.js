import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import http from 'services/httpService';
import { toast } from 'react-hot-toast';
import { Box, InputLabel } from '@mui/material';
import { Input } from 'styles/input';
import { useDispatch } from 'react-redux';
import { addNewItemAsync } from 'store/item/item-actions';


export default function AddNewItemDialog({ text, collectionId, menuClose }) {
    const [open, setOpen] = React.useState(false);

    const [name, setName] = React.useState(null);
    const [primaryAttachment, setPrimaryAttachment] = React.useState(null); //? the attachment which's metadata will be used
    const [itemType, setItemType] = React.useState(undefined);
    const [metadata, setMetadata] = React.useState({});  //?object
    const [tags, setTags] = React.useState([{ name: "1", color: "1" }]);       //? array of tag objects  { name: string, color: string } 
    const [related, setRelated] = React.useState([]);  //? array of items

    const dispatch = useDispatch();

    const addItem = () => {
        console.log(tags);

        const itemData = {
            name: name,
            primaryAttachment: primaryAttachment,
            itemType: itemType,
            metadata: metadata,
            tags: tags,
            related: related
        }

        dispatch(addNewItemAsync(collectionId, itemData));
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [newTagKey, setNewTagKey] = React.useState("");
    const [newTagValue, setNewTagValue] = React.useState("");

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                {text}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{text}</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                        <InputLabel htmlFor="name" sx={{ fontSize: "16px", marginBottom: "10px" }}>Enter Item name</InputLabel >
                        <Input id="name" label="name" error={false} variant="outlined" value={name} onChange={(e) => {
                            setName(e.target.value);
                        }} />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                        <InputLabel htmlFor="key" sx={{ fontSize: "16px", marginBottom: "10px" }}>Enter new tag key</InputLabel >
                        <Input id="key" label="key" error={false} variant="outlined" value={newTagKey} onChange={(e) => {
                            setNewTagKey(e.target.value);
                        }} />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                        <InputLabel htmlFor="value" sx={{ fontSize: "16px", marginBottom: "10px" }}>Enter new tag value</InputLabel >
                        <Input id="value" label="value" error={false} variant="outlined" value={newTagValue} onChange={(e) => {
                            setNewTagValue(e.target.value);
                        }} />
                    </Box>
                    <Button onClick={() => {
                        if (newTagKey.length === 0 || newTagValue.length === 0) return;
                        setTags((prevTags) => [...prevTags, { [newTagKey]: newTagValue }]);
                        setNewTagKey("");
                        setNewTagValue("");
                    }}>add</Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        addItem()
                        handleClose()
                        menuClose()
                    }}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}