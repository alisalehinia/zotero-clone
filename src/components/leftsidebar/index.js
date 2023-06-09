import React, { useEffect, useState } from 'react'
import http from 'services/httpService'
import LibraryAccordion from '../accordion/library';
import FormDialog from '../formDialog/addLibrary';
import { useLibraryContext } from '@/context/LibraryContext';

const LeftSideBar = () => {
    const { libraries, setLibraries } = useLibraryContext();

    const fetchLibraries = async () => {
        const res = await http.get("/libraries");
        console.log(res.data.data);
        setLibraries(res.data.data)
    }

    useEffect(() => {
        fetchLibraries();
    }, [])


    return (
        <div>
            <h2>left sidebar</h2>
            <FormDialog text="New Library" fetchLibraries={fetchLibraries} />
            {
                libraries.map((library) => {
                    return <LibraryAccordion
                        key={library._id}
                        libraryId={library._id}
                        primaryText={library.name}
                        secondaryText={library.private ? "private" : "public"}
                        fetchLibraries={fetchLibraries}
                        content={"library"} />
                })
            }
        </div>
    )
}

export default LeftSideBar