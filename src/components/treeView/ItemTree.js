import { useAttachmentContext } from "@/context/AttachmentContext";
import { TreeItem } from "@mui/lab"
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import http from "services/httpService";
import { fetchCollectionItems } from "store/item/item-actions";




const ItemTree = ({ collectionId }) => {
    const { attachments, setAttachments } = useAttachmentContext();

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

    const func = (id) => {
        http.get(`/items/${id}/attachments`).then((res) => {
            console.log("qqqqqqq");
            setAttachments(res.data.data);
        }).catch((err) => console.log(err))
    }

    return (
        items[collectionId].map((item) => {
            return (
                <TreeItem key={item._id}

                    nodeId={item._id}
                    node={item._id}
                    label={item.name}
                    onClick={() => func(item._id)}
                />

            )
        })
    )
}

export default ItemTree