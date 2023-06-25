import { TreeItem } from "@mui/lab"
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollectionItems } from "store/item/item-actions";




const ItemTree = ({ collectionId }) => {

    const items = useSelector((state) => state.item.itemsOfCollections);
    const loading = useSelector((state) => state.item.loading);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCollectionItems(collectionId))
    }, [collectionId, dispatch])

    if (loading) {
        return (
            <CircularProgress />
        )
    }


    return (
        items[collectionId].map((item) => {
            return (
                <TreeItem key={item._id}

                    nodeId={item._id}
                    node={item._id}
                    label={item.name}
                >
                    <ItemTree itemId={item._id} />
                </TreeItem>
            )
        })
    )
}

export default ItemTree