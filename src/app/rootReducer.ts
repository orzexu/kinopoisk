import { combineReducers } from '@reduxjs/toolkit'
import favoriteReducer from '../features/addToFavorites/addToFavSlice'
import dropdownReducer from '../features/dropdown/dropdownSlice'
import searchReducer from '../features/searchbar/searchbarSlice'
import genreReducer from '../pages/GenreMoviesPage/moviesSlice'

const rootReducer = combineReducers({
	dropdown: dropdownReducer,
	search: searchReducer,
	favorites: favoriteReducer,
	movies: genreReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
