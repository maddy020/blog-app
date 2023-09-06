import { configureStore } from "@reduxjs/toolkit";
import { toLike,toDislike } from "../features/likesystem/slice";
export const store=configureStore({
    reducer:{
        toLike,
        toDislike
    }
})