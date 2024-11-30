import {createSlice} from "@reduxjs/toolkit"
import { STATUS } from "../status/Status" 
import axios from "axios"

const khaltiSlice=createSlice({
    name:"khal",
    initialState:{
        khaltiUrl:null,
        status:STATUS.LOADING
    },
    reducers:{
        setKhaltiUrl(state,action){
            state.khaltiUrl=action.payload
        },
        setStatus(state,action){
            state.status=action.payload
        }
    }
})

export const {setKhaltiUrl,setStatus}=khaltiSlice.actions
export default khaltiSlice.reducer

//khalti payment
export function khaltiPayment(data){
    return async function khaltiPayment(dispatch) {
        dispatch(setStatus(STATUS.LOADING))
        try{
            const response=axios.post("http://localhost:3000/api/khalti",data)
            if(response.status===200){
                const  {data}=response.data;
                if(data.url){
                    dispatch(setKhaltiUrl(data.url));
                }else{
                    dispatch(setKhaltiUrl(null));
                }
                dispatch(setStatus(STATUS.SUCCESS));
            }
        }catch(err){
            dispatch(setStatus(STATUS.ERROR));
        }  
    }
}