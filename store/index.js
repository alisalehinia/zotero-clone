import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './ui-slice';
import cartSlice from './cart-slice';
import librarySlice from './library/library-slice';

const store = configureStore({
    reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer, library: librarySlice.reducer },
});

export default store;