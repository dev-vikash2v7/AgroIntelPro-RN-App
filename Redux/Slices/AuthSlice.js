import { createSlice  } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-community/async-storage';

const AuthSlice = createSlice({
    name: 'auth',

    initialState: {
      user : null,
    },

    reducers: {
      setUser : (state , action) => {
          AsyncStorage.setItem('user', JSON.stringify(action.payload));
          state.user = action.payload;
      },
      removeUser : (state , action) => {
        AsyncStorage.clear()
          state.user = null
      },
    }
  })

export const {setUser , removeUser} = AuthSlice.actions;

export default AuthSlice.reducer