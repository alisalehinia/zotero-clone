import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import http from 'services/httpService';
import CollectionAccordion from './collection';
import FormDialog from '../formDialog/addCollection';
import UpdateFormDialog from '../formDialog/updateLibrary';
import { toast } from 'react-hot-toast';
import { useCollectionContext } from '@/context/CollectionContext';
import { useLibraryContext } from '@/context/LibraryContext';
import { Box, ButtonGroup, Button } from "@mui/material";
import { LeftSideAccordionLibrary } from 'styles/body';
import { Colors } from 'styles/theme';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export default function LibraryAccordion({ primaryText, secondaryText, content, libraryId, fetchLibraries }) {
  const [expanded, setExpanded] = React.useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { collections, setCollections } = useCollectionContext();


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    fetchLibraryCollections(libraryId)
  };

  const fetchLibraryCollections = async (libraryId) => {
    try {
      const res = await http.get(`/libraries/${libraryId}/collections`);
      // console.log("fetch collections ", res.data.data);
      setCollections(res.data.data)
    } catch (error) {
      console.log("fetch collections ", error);
      toast.error(error)
    }
  }

  const deleteLibrary = async (libraryId) => {
    try {
      console.log(libraryId);
      const res = await http.delete(`/libraries/${libraryId}`);
      fetchLibraries();
      console.log("delete success", res);
    } catch (error) {
      console.log("delete fail", error);
    }
  }
  return (
    <Box sx={{ marginBottom: "4px" }}>
      <LeftSideAccordionLibrary expanded={expanded === primaryText} onChange={handleChange(primaryText)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={primaryText}
          id={primaryText}
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {primaryText}
          </Typography>
          <Typography sx={{ color: Colors.info }}>
            {secondaryText}
          </Typography>
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
                <UpdateFormDialog text="change library info" libraryId={libraryId} fetchLibraries={fetchLibraries} menuClose={handleClose} />
              </MenuItem>
              <MenuItem>
                <FormDialog text="Add new Collection" parentId={libraryId} fetchLibraryCollections={fetchLibraryCollections} menuClose={handleClose} />
              </MenuItem>
            </Menu>
            <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: "4px" }}>
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
              {/* //!delete library Button */}
              <IconButton aria-label="delete">
                <DeleteIcon onClick={() => {
                  setDeleteDialogOpen(true);
                }} />
              </IconButton>
            </Box>
            {collections.length > 0 && collections.map((collection) => {
              return <CollectionAccordion
                key={collection._id}
                libraryId={libraryId}
                fetchLibraryCollections={fetchLibraryCollections}
                collectionId={collection._id}
                primaryText={collection.name}
                secondaryText={collection.type}
                content={"item"}
              />
            })}
          </Typography>
        </AccordionDetails>
      </LeftSideAccordionLibrary>
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
            deleteLibrary(libraryId);
            setDeleteDialogOpen(false);
          }} autoFocus>
            delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box >
  );
}


