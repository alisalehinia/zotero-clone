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


export default function FormDialog({ text, collectionId, fetchCollectionItems }) {
    const [open, setOpen] = React.useState(false);

    const [name, setName] = React.useState(null);
    const [primaryAttachment, setPrimaryAttachment] = React.useState(null); //? the attachment which's metadata will be used
    const [itemType, setItemType] = React.useState(undefined);
    const [metadata, setMetadata] = React.useState({});  //?object
    const [tags, setTags] = React.useState([]);       //? array of tag objects
    const [related, setRelated] = React.useState([]);  //? array of items


    const addItem = () => {
        console.log(name);
        http.post(`/collections/${collectionId}/items`, {
            name: name,
            primaryAttachment: primaryAttachment,
            itemType: itemType,
            metadata: metadata,
            tags: tags,
            related: related
        }).then((response) => {
            console.log("success ----------", response)
            toast.success("new item added");
            fetchCollectionItems(collectionId);
        }).catch((error) => {
            console.log("failure to add item-----------", error);
            toast.error(error.response.data.message)
        })
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
                        <h4>Enter Info</h4>
                    </DialogContentText>
                    <input className='textField__input m-1' placeholder='item name' type="text" value={name} onChange={(e) => setName(e.target.value)} />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        addItem()
                        handleClose()
                    }}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}