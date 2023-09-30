import { createSlice  } from '@reduxjs/toolkit'

const AuthSlice = createSlice({
    name: 'auth',

    initialState: {
      user : {name : 'vikash' , email : 'vk@gmail.com'},
    },

    reducers: {
      setUser : (state , action) => {
          state.user = action.payload
      },
      removeUser : (state , action) => {
          state.user = null
      },
    }
  })

export const {setUser , removeUser} = AuthSlice.actions;

export default AuthSlice.reducer