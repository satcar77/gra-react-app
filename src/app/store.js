import { configureStore } from '@reduxjs/toolkit';
import graReducer from '../slices/graSlice';

export default configureStore({
  reducer: {
    graList: graReducer,
  },
});
