import http from "services/httpService";
import { collectionActions } from "./collection-slice";
import { toast } from "react-hot-toast";


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

export const addNewCollectionAsync = (libraryId, collectionData) => {
    return async (dispatch) => {
        try {
            // Make API call here to add the new collection within the library
            const res = await http.post(`/libraries/${libraryId}/collections`, collectionData); // Replace with your actual API endpoint and request data

            dispatch(collectionActions.addNewCollection({ libraryId, collectionData: res.data.data }));
            toast.success("add new collection")
        } catch (error) {
            console.log(error);
        }
    };
};