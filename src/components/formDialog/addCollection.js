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


export default function FormDialog({ text, parentId, fetchLibraryCollections }) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(null);


    const addCollection = () => {
        console.log(name);
        http.post(`/libraries/${parentId}/collections`, {
            name: name
        }).then((response) => {
            console.log("success ----------", response);
            fetchLibraryCollections(parentId)
            toast.success("new collection added")
        }).catch((error) => {
            console.log("failure -----------", error);
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
                    <input className='textField__input m-1' placeholder='collection name' type="text" value={name} onChange={(e) => setName(e.target.value)} />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        addCollection()
                        handleClose()
                    }}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}