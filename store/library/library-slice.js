import { createSlice } from '@reduxjs/toolkit';

const librarySlice = createSlice({
    name: 'library',
    initialState: {
        libraries: [],
        loading: false,
        error: null,
    },
    reducers: {
        // replaceCart(state, action) {
        //     state.totalQuantity = action.payload.totalQuantity;
        //     state.items = action.payload.items;
        // },
        // addItemToCart(state, action) {
        //     const newItem = action.payload;
        //     const existingItem = state.items.find((item) => item.id === newItem.id);
        //     state.totalQuantity++;
        //     state.changed = true;
        //     if (!existingItem) {
        //         state.items.push({
        //             id: newItem.id,
        //             price: newItem.price,
        //             quantity: 1,
        //             totalPrice: newItem.price,
        //             name: newItem.title,
        //         });
        //     } else {
        //         existingItem.quantity++;
        //         existingItem.totalPrice = existingItem.totalPrice + newItem.price;
        //     }
        // },
        // removeItemFromCart(state, action) {
        //     const id = action.payload;
        //     const existingItem = state.items.find((item) => item.id === id);
        //     state.totalQuantity--;
        //     state.changed = true;
        //     if (existingItem.quantity === 1) {
        //         state.items = state.items.filter((item) => item.id !== id);
        //     } else {
        //         existingItem.quantity--;
        //         existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        //     }
        // },
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
