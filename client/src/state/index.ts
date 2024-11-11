import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface initialStateTypes {
    isSidebarCollapsed: boolean;
    isDarkMode: boolean;
}

//Declaring state for the sidebar and dark mode after defining types earlier
const initialState: initialStateTypes = {
    isSidebarCollapsed: false,
    isDarkMode: false,
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        //changes sidebar based on local state
        setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) =>{
            state.isSidebarCollapsed = action.payload;
        },
        setIsDarkMode: (state, action: PayloadAction<boolean>) =>{
            state.isDarkMode = action.payload;
        } 
    },
})

export const { setIsSidebarCollapsed, setIsDarkMode } = globalSlice.actions;
export default globalSlice.reducer;

