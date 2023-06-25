import http from "services/httpService";
import { itemActions } from "./item-slice";


export const fetchCollectionItems = (collectionId) => {
    return async (dispatch) => {
        try {
            dispatch(itemActions.fetchCollectionsItemsStart());

            // Make API call here to fetch the user's libraries
            const res = await http.get(`/collections/${collectionId}/items`); // Replace with your actual API endpoint

            dispatch(itemActions.fetchCollectionsItemsSuccess({ items: res.data.data, colId: collectionId }));
        } catch (error) {
            dispatch(itemActions.fetchCollectionItemsFailure(error.message));
        }
    };
};