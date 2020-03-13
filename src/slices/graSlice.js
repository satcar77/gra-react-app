import { createSlice } from '@reduxjs/toolkit';

export const graslice = createSlice({
  name: 'graList',
  initialState: {
    list: [],
  },
  reducers: {
    dataLoaded: (state,action) => {
        state.list = action.payload;
    },
  },
});

export const { dataLoaded } = graslice.actions;
export const selectGAList = state => state.graList.list;

export default graslice.reducer;
