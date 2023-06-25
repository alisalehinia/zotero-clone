import { createSlice } from '@reduxjs/toolkit';

const collection = createSlice({
    name: 'collection',
    initialState: {
        library: {},
        loading: false,
        error: null,
    },
    reducers: {
        fetchLibraryCollectionStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchLibraryCollectionSuccess(state, action) {
            state.library[action.payload.libId] = action.payload.collections;
            state.loading = false;
            state.error = null;
        },
        fetchLibraryCollectionFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const collectionActions = collection.actions;

export default collection;
