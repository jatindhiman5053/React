import {configureStore} from '@reduxjs/toolkit';
import UserReducer  from "../Reducer/reducer";


export const store = configureStore({
  reducer: UserReducer
});  