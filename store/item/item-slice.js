import { createSlice } from '@reduxjs/toolkit';

const item = createSlice({
    name: 'item',
    initialState: {
        itemsOfCollections: {},
        loading: false,
        error: null,
    },
    reducers: {
        fetchCollectionsItemsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchCollectionsItemsSuccess(state, action) {
            state.itemsOfCollections[action.payload.colId] = action.payload.items;
            state.loading = false;
            state.error = null;
        },
        fetchCollectionItemsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addNewItem(state, action) {
            const { collectionId, itemData } = action.payload;

            if (!state.itemsOfCollections[collectionId]) {
                state.itemsOfCollections[collectionId] = []; // Initialize the items array for the collection if it doesn't exist
            }

            state.itemsOfCollections[collectionId].push(itemData);
        },
    },
});

export const itemActions = item.actions;

export default item;
