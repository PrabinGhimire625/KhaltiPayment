import {configureStore} from "@reduxjs/toolkit";
import khaltiSlice from "./khaltiSlice"

const store=configureStore({
    reducer:{
        khalti:khaltiSlice
    }
})
export default store