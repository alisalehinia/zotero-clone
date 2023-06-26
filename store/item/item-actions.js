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

export const addNewItemAsync = (collectionId, itemData) => {
    return async (dispatch) => {
        try {
            // Make API call here to add the new item to the collection
            const res = await http.post(`/collections/${collectionId}/items`, itemData); // Replace with your actual API endpoint and request data

            dispatch(itemActions.addNewItem({ collectionId, itemData: res.data.data }));
        } catch (error) {
            console.log(error);
        }
    };
};
