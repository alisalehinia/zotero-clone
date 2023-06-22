import http from "services/httpService";
import { libraryActions } from "./library-slice";


export const fetchUserLibraries = () => {
    return async (dispatch) => {
        try {
            dispatch(libraryActions.fetchUserLibrariesStart());

            // Make API call here to fetch the user's libraries
            const res = await http.get('/libraries'); // Replace with your actual API endpoint

            dispatch(libraryActions.fetchUserLibrariesSuccess(res.data.data));
        } catch (error) {
            dispatch(libraryActions.fetchUserLibrariesFailure(error.message));
        }
    };
};