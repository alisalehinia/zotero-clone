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

export default function LibraryAccordion({ primaryText, secondaryText, content, libraryId, fetchLibraries }) {
  const [expanded, setExpanded] = React.useState(false);

  const { collections, setCollections } = useCollectionContext();


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    fetchLibraryCollections(libraryId)
  };

  const fetchLibraryCollections = async (libraryId) => {
    try {
      const res = await http.get(`/libraries/${libraryId}/collections`);
      console.log("fetch collections ", res.data.data);
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
    <div>
      <Accordion expanded={expanded === primaryText} onChange={handleChange(primaryText)}>
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
            {content}
            {/* <button className='m-2 bg-blue-500' onClick={() => fetchLibraryCollections(libraryId)}>fetchColls</button> */}
            <UpdateFormDialog text="change library info" libraryId={libraryId} fetchLibraries={fetchLibraries} />
            <FormDialog text="Add new Collection" parentId={libraryId} fetchLibraryCollections={fetchLibraryCollections} />
            <button onClick={() => {
              deleteLibrary(libraryId);
            }}>delete</button>
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
      </Accordion>
    </div>
  );
}