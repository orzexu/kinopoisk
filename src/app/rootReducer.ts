import { combineReducers } from "@reduxjs/toolkit";
import dropdownReducer from '../features/dropdown/dropdownSlice'
import searchReducer from '../features/searchbar/searchbarSlice'
import favoriteReducer from "../features/addToFavorites/addToFavSlice";


const rootReducer = combineReducers({
    dropdown: dropdownReducer,
    search: searchReducer,
    favorites: favoriteReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer