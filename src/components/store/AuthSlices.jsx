import { createSlice } from "@reduxjs/toolkit";
import { userLogin,userRegister} from "./authActions";

const initialState={
    loading:false,
    loginInfo:null,
    error:null,
    success:false,
//register info
    loading1:false,
    regInfo:null,
    error1:null,
    success1:false,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success =false;
        })
        .addCase(userLogin.fulfilled, (state,{payload}) => {
            state.loading=false;
            state.loginInfo=payload;
            state.success=true;
            state.error=null;
        })
        .addCase(userLogin.rejected,(state, {paylaod})=>{
            state.loading=false;
            state.error=paylaod;
            state.success=false;
        })

        //register info
        .addCase(userRegister.pending, (state) => {
            state.loading1 = true;
            state.error1 = null;
            state.success1 =false;
        })
        .addCase(userRegister.fulfilled, (state,{payload}) => {
            state.loading1=false;
            state.regInfo=payload;
            state.success1=true;
            
        })
        .addCase(userRegister.rejected,(state, {paylaod})=>{
            state.loading1=false;
            state.error1=paylaod;
            state.success1=false;
        })
    }
});

export default authSlice.reducer;