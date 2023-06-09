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


export default function UpdateFormDialog({ text, libraryId, fetchLibraries }) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(null);
    const [group, setGroup] = React.useState(null);
    const [privateGroup, setPrivateGroup] = React.useState(false);

    const changeLibraryInfo = async (libraryId) => {
        try {
            const res = await http.patch(`/libraries/${libraryId}`, {
                name: name,
                group: group,
                private: privateGroup
            })
            console.log("update library info", res.data);

            fetchLibraries()
        } catch (error) {
            console.log("update library info fail", error);
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
                    <input className='textField__input m-1' placeholder='library name' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <input className='textField__input m-1' placeholder='Group name' type="text" value={group} onChange={(e) => setGroup(e.target.value)} />
                    <label for="privateGroup">Private</label>
                    <input name="privateGroup" className='m-1' type="checkbox" value={privateGroup} onChange={(e) => setPrivateGroup((privateGroup) => !privateGroup)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        changeLibraryInfo(libraryId)
                        handleClose()
                    }}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}