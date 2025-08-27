import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './Slices/AuthSlice'

export default ReduxStore = configureStore({
    reducer: {
        auth : AuthReducer
    }
  })