import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, InputLabel } from '@mui/material';
import { Input } from 'styles/input';
import http from 'services/httpService';

export default function CreateGroupDialog() {
    const [open, setOpen] = React.useState(false);

    // ! group data ---------------- 
    const [name, setName] = React.useState("");


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // !-----------submit formdata
    const handleSubmit = async (name) => {
        try {
            const res = await http.post('/groups', { name: name });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Create new Group
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Create new Group? "}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                        <InputLabel htmlFor="name" sx={{ fontSize: "16px", marginBottom: "10px" }}>Enter group name</InputLabel >
                        <Input id="name" label="name" error={false} variant="outlined" value={name} onChange={(e) => {
                            setName(e.target.value);
                        }} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button onClick={() => {
                        handleSubmit(name)
                        handleClose()
                    }} autoFocus>
                        create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}