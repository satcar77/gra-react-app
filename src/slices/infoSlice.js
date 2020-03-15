import { createSlice } from '@reduxjs/toolkit';

export const infoSlice = createSlice({
  name: 'info',
  initialState: {
    data: {name:'...'},
  },
  reducers: {
    dataLoaded: (state,action) => {
        state.data = action.payload[0];
    },
    dataUpdated: (state,action)=>{
      state.data = action.payload;
    },
  },
});

export const { dataLoaded,dataUpdated } = infoSlice.actions;
export const selectInfo = state => state.info.data;

export default infoSlice.reducer;
