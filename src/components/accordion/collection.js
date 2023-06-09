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

export default function CollectionAccordion({ primaryText, secondaryText, content, collectionId, fetchLibraryCollections, libraryId }) {
    const [expanded, setExpanded] = React.useState(false);

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
                        {/* <button className='m-2 bg-blue-500' onClick={() => fetchCollItems(collectionId)}>fetchItems</button> */}
                        <button onClick={() => deleteCollection(collectionId)}>delete col</button>
                        <UpdateCollectionFormDialog text="update col Info" collectionId={collectionId}
                            libraryId={libraryId}
                            fetchLibraryCollections={fetchLibraryCollections} />
                        <FormDialog text="add item" collectionId={collectionId} fetchCollectionItems={() => fetchCollItems(collectionId)} />
                        {items.length > 0 && items.map((item) => {
                            return <><div className='ml-2 border' key={item._id}>{item.name}</div>
                                <UpdateItemFormDialog text="update item" itemId={item._id} collectionId={collectionId} fetchCollectionItems={() => fetchCollItems(collectionId)} />
                                <button onClick={() => deleteItem(item._id)}>delete item</button>
                            </>
                        })}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}