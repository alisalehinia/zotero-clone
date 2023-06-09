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


export default function UpdateItemFormDialog({ text, itemId, fetchCollectionItems, collectionId }) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(null);
    const [primaryAttachment, setPrimaryAttachment] = React.useState(null); //? the attachment which's metadata will be used
    const [itemType, setItemType] = React.useState(undefined);
    const [metadata, setMetadata] = React.useState({});  //?object
    const [tags, setTags] = React.useState([]);       //? array of tag objects
    const [related, setRelated] = React.useState([]);  //? array of items

    const changeItemInfo = async (itemId) => {
        try {
            const res = await http.patch(`/items/${itemId}`, {
                name: name,
                name: name,
                primaryAttachment: primaryAttachment,
                itemType: itemType,
                metadata: metadata,
                tags: tags,
                related: related
            })
            fetchCollectionItems(collectionId)
            console.log("update item info", res.data);
        } catch (error) {
            console.log("update item info fail", error);
        }
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                {text}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{text}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <h4>Enter new Info</h4>
                    </DialogContentText>
                    <input className='textField__input m-1' placeholder='collection name' type="text" value={name} onChange={(e) => setName(e.target.value)} />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        changeItemInfo(itemId)
                        handleClose()
                    }}>
                        update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}