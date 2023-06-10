import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import http from 'services/httpService';
import { toast } from 'react-hot-toast';
import { Input } from 'styles/input';
import { Box, Checkbox, InputLabel, MenuItem, Select } from '@mui/material';


export default function FormDialog({ text, fetchLibraries }) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(null);
    const [group, setGroup] = React.useState(null);
    const [privateGroup, setPrivateGroup] = React.useState(false);

    const [allUserGroups, setAllUserGroups] = React.useState();

    const addLibrary = () => {
        console.log(name);
        http.post("/libraries", {
            name: name,
            group: group,
            private: privateGroup
        }).then((response) => {
            console.log("success ----------", response);
            fetchLibraries();
            toast.success("new library added")
        }).catch((error) => {
            console.log("failure -----------", error);
            toast.error(error?.response?.data?.message)
        })
    }
    const fetchUserGroups = () => {
        http.get("/groups").then((res) => {
            console.log(res);
            setAllUserGroups(res.data.data);
            console.log(allUserGroups);
        }).catch((err) => console.log(err))
    }
    const handleClickOpen = () => {
        setOpen(true);
        fetchUserGroups();
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log("===============================", name, group, privateGroup);
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                {text}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{text}</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        <h4>Enter Info</h4>
                    </DialogContentText> */}
                    {/* <input className='textField__input m-1' placeholder='library name' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <input className='textField__input m-1' placeholder='Group name' type="text" value={group} onChange={(e) => setGroup(e.target.value)} /> */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                        <InputLabel htmlFor="email" sx={{ fontSize: "16px", marginBottom: "10px" }}>Enter Library name</InputLabel >
                        <Input id="name" label="name" error={false} variant="outlined" value={name} onChange={(e) => {
                            setName(e.target.value);
                        }} />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
                        <InputLabel htmlFor="email" sx={{ fontSize: "16px", }}>group</InputLabel >
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={group}
                            label="group"
                            onChange={(e) => setGroup(e.target.value)}
                        >
                            {
                                allUserGroups && allUserGroups.map((group) => {
                                    return <MenuItem key={group._id} value={group._id}>{group.name}</MenuItem>
                                })
                            }
                        </Select>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: "4px", marginBottom: "20px" }}>
                        <InputLabel htmlFor="email" sx={{ fontSize: "16px", margin: "8px" }}>private</InputLabel >
                        <Checkbox
                            checked={privateGroup}
                            onChange={(e) => setPrivateGroup((privateGroup) => !privateGroup)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        addLibrary()
                        handleClose()
                    }}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}