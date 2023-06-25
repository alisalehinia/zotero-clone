import http from "services/httpService";
import { collectionActions } from "./collection-slice";


export const fetchLibraryCollections = (libraryId) => {
    return async (dispatch) => {
        try {
            dispatch(collectionActions.fetchLibraryCollectionStart());

            // Make API call here to fetch the user's libraries
            const res = await http.get(`/libraries/${libraryId}/collections`); // Replace with your actual API endpoint

            dispatch(collectionActions.fetchLibraryCollectionSuccess({ collections: res.data.data, libId: libraryId }));
        } catch (error) {
            dispatch(collectionActions.fetchLibraryCollectionFailure(error.message));
        }
    };
};