import React, { useEffect, useState } from 'react'
import http from 'services/httpService';

const Notes = ({ itemId }) => {

    const [itemNotes, setItemNotes] = useState([]);

    const fetchItemNotes = async (itemId) => {
        const res = await http.get(`/items/${itemId}/notes`);
        setItemNotes(res.data.data);
    }

    useEffect(() => {
        fetchItemNotes(itemId);
    }, [itemId])
    return (
        <div className='border rounded'>
            {
                itemNotes ? itemNotes.map(note => (
                    <div key={note._id} className=' p-1 m-1 border-b'>
                        <h4>notes</h4>
                        {note.text}
                    </div>
                )) : <div>
                    No notes found for this Item!
                </div>
            }
        </div>
    )
}

export default Notes