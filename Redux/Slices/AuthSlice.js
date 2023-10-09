import { createSlice  } from '@reduxjs/toolkit'

const AuthSlice = createSlice({
    name: 'auth',

    initialState: {
      user : null,
    },

    reducers: {
      setUser : (state , action) => {
        console.log(action.payload)
          state.user = action.payload
      },
      removeUser : (state , action) => {
          state.user = null
      },
    }
  })

export const {setUser , removeUser} = AuthSlice.actions;

export default AuthSlice.reducer