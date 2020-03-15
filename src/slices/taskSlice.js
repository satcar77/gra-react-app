import { createSlice } from '@reduxjs/toolkit';

export const taskslice = createSlice({
  name: 'taskList',
  initialState: {
    list: [],
  },
  reducers: {
    dataLoaded: (state,action) => {
        state.list = action.payload;
    },
  },
});

export const { dataLoaded } = taskslice.actions;
export const selectTaskList = state => state.taskList.list;

export default taskslice.reducer;
