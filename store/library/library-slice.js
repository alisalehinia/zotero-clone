import { createSlice } from '@reduxjs/toolkit';

const librarySlice = createSlice({
    name: 'library',
    initialState: {
        libraries: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchUserLibrariesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchUserLibrariesSuccess(state, action) {
            state.libraries = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchUserLibrariesFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const libraryActions = librarySlice.actions;

export default librarySlice;
