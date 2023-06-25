import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const LibraryTree = ({ library }) => {
    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {libraries.map((library) => (
                <TreeItem key={library.id} nodeId={library.id} label={library.name}>
                    1
                </TreeItem>
            ))}
        </TreeView>
    )
}

export default LibraryTree