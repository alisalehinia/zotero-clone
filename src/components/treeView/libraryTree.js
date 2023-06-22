import { ExpandMoreIcon, ChevronRightIcon } from "@mui/icons-material"

import { TreeItem, TreeView } from '@mui/lab'
import React from 'react'

const LibraryTree = ({ library }) => {
    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {/* {libraries.map((library) => ( */}
            {/* // <TreeItem key={library.id} nodeId={library.id} label={library.name}> */}
            {/* Render additional library details if needed */}
            {/* 99999 */}
            {/* </TreeItem> */}
            {/* // ))} */}

            {/* <TreeItem>{library.name}</TreeItem> */}
            <TreeItem>5</TreeItem>
        </TreeView>
    )
}

export default LibraryTree