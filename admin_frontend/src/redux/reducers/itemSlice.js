import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const itemSlice = createSlice({
	name: 'item',
	initialState: {
		items: [],
        loading: false
	},
	reducers: {
		getItems: (state, action) => {
			state.items = action.payload;
            state.loading = false;
		},
	},
});

// Selectors
export const listItems = (state) => state.item.items;

export const { 
	getItems,
} = itemSlice.actions;
export default itemSlice.reducer;
