import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Movie {
    imdbID: string
    Title: string
    Year: string
    Poster: string
    Type?: string
}

interface FavoritesState {
    favorites: Movie[]
}

const initialState: FavoritesState = {
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]')
}

const addToFavSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Movie>) => {
        const movie = action.payload
        const isAlreadyAdded = state.favorites.some((fav) => fav.imdbID === movie.imdbID)

        if (!isAlreadyAdded) {
            state.favorites.push(movie)
            localStorage.setItem('favorites', JSON.stringify(state.favorites))
        }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
        const imdbID = action.payload
        state.favorites = state.favorites.filter((fav) => fav.imdbID !== imdbID)
        localStorage.setItem('favorites', JSON.stringify(state.favorites))
    }
  }
});

export const { addToFavorites, removeFromFavorites } = addToFavSlice.actions

export const selectFavorites = (state: {favorites: FavoritesState}) => state.favorites.favorites

export default addToFavSlice.reducer