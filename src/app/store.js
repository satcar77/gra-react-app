import { configureStore } from '@reduxjs/toolkit';
import graReducer from '../slices/graSlice';
import taskReducer from '../slices/taskSlice';
import infoReducer from '../slices/infoSlice'
export default configureStore({
  reducer: {
    graList: graReducer,
    taskList: taskReducer,
    info: infoReducer
  },
});
