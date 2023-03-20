import { createSlice, configureStore} from '@reduxjs/toolkit'

//creating slice
const authSlice = createSlice({
    name: "auth",
    initialState:{
        isLogin: false
    },
    reducers:{
        login(state){
            state.isLogin = true
        }, 
        logout(state){
            state.isLogin = false
        }
    }
})

//exporting slice as a action 
export const authActions = authSlice.actions

export const store = configureStore({
    reducer: authSlice.reducer,
})