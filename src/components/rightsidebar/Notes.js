import React, { useEffect, useState } from 'react'
import http from 'services/httpService';

const Notes = ({ itemId = null, collectionId = null }) => {

    const [itemNotes, setItemNotes] = useState([]);
    const [collectionNotes, setCollectionNotes] = useState([]);

    const fetchItemNotes = async (itemId) => {
        const res = await http.get(`/items/${itemId}/notes`);
        setItemNotes(res.data.data);
        console.log(res.data.data);
    }
    const fetchCollectionNotes = async (collectionId) => {
        const res = await http.get(`/collections/${collectionId}/notes`);
        setCollectionNotes(res.data.data);
        console.log(res.data.data);
    }
    useEffect(() => {
        fetchItemNotes(itemId);
        fetchCollectionNotes(collectionId)
    }, [itemId, collectionId])
    return (
        <div className='border rounded flex m-1'>
            <div className='border-r'>

                {

                    itemNotes ? <div className='p-1 m-1'>  <h4>item notes</h4>{

                        itemNotes.map(note => (
                            <div key={note._id} className=' p-1 m-1 border-b flex flex-col '>
                                <div>
                                    {note.text}
                                </div>
                            </div>
                        ))}</div> : <div>
                        No notes found for this Item!
                    </div>
                }
            </div>
            <div className='border-r'>
                {
                    collectionNotes ? <div className='p-1 m-1'>
                        <h4>collection notes</h4>
                        {collectionNotes.map(note => (
                            <div key={note._id} className=' p-1 m-1 border-b flex flex-col '>
                                {note.text}
                            </div>
                        ))} </div> : <div>
                        No notes found for this collection!
                    </div>
                }

            </div>
        </div>
    )
}

export default Notes