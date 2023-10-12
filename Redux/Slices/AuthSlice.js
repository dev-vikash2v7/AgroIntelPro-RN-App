import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice  } from '@reduxjs/toolkit'

const AuthSlice = createSlice({
    name: 'auth',

    initialState: {
      user : null,
    },

    reducers: {
      setUser : (state , action) => {
          AsyncStorage.setItem('user_'+action.payload?.id, JSON.stringify(action.payload));
          state.user = action.payload;
      },
      updateUser : (state , action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.address = action.payload.address;
        console.log('updateUser')
        AsyncStorage.setItem('user_'+state?.user?.id, JSON.stringify(state.user));
      },
      removeUser : (state ) => {
        AsyncStorage.clear()
          state.user = null
      },
      addFarm : (state , action) =>{
        state.user = {...state.user , 'farmDetails' : action.payload}
      }
    }
  })

export const {setUser , removeUser , updateUser ,addFarm} = AuthSlice.actions;

export default AuthSlice.reducer