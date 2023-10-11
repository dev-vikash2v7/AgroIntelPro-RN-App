import { createSlice  } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-community/async-storage';

const AuthSlice = createSlice({
    name: 'auth',

    initialState: {
      user : null,
    },

    reducers: {
      setUser : (state , action) => {
          AsyncStorage.setItem('user_'+action.payload.id, JSON.stringify(action.payload));
          state.user = action.payload;
      },
      updateUser : (state , action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.address = action.payload.address;
        AsyncStorage.setItem('user_'+state.user.id, JSON.stringify(state.user));
      },
      removeUser : (state , action) => {
        AsyncStorage.clear()
          state.user = null
      },
    }
  })

export const {setUser , removeUser , updateUser} = AuthSlice.actions;

export default AuthSlice.reducer