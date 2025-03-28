import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchMovieDetails, fetchMovies } from './searchApi'
import { RootState } from '../../app/store'

export interface Movie {
	imdbID: string
	Type: string
	Title: string
	Poster: string
	Year: string
    imdbRating: string
}

export interface Rating {
    Source: string
    Value: string
}

interface MovieDetails {
	imdbID: string
	Title: string
	Year: string
	Poster: string
	Plot: string
	Actors: string
	Director: string
	Genre: string
	Runtime: string
    Ratings: Rating[]
}

interface SearchState {
    selectedMovie: MovieDetails | null
	query: string
	results: Movie[]
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
}

const initialState: SearchState = {
	query: '',
	results: [],
	status: 'idle',
	error: null,
    selectedMovie: null
}

export const searchMovies = createAsyncThunk(
	'search/searchMovies',
	async ({ query, year }: { query: string; year?: string }, { rejectWithValue }) => {
		try {
			const results = await fetchMovies(query, year)
			return results
		} catch (error: unknown) {
            if (error instanceof Error) {
              return rejectWithValue(error.message);
            } else {
              return rejectWithValue("Произошла неизвестная ошибка");
            }
          }
	}
)

export const getMovieDetails = createAsyncThunk(
    'search/getMovieDetaails',
    async (imdbID: string, { rejectWithValue }) => {
        try {
            const details = await fetchMovieDetails(imdbID)
            return details
        } catch (error: unknown) {
            if (error instanceof Error) {
              return rejectWithValue(error.message);
            } else {
              return rejectWithValue("Произошла неизвестная ошибка");
            }
          }
    }
)

const searchbarSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setQuery: (state, action) => {
			state.query = action.payload
		},
		clearResults: state => {
			state.results = []
		},
	},
	extraReducers: builder => {
		builder
			.addCase(searchMovies.pending, state => {
				state.status = 'loading'
			})
			.addCase(searchMovies.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.results = action.payload
			})
			.addCase(searchMovies.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload as string
			})
            .addCase(getMovieDetails.fulfilled, (state, action) => {
                state.selectedMovie = action.payload
            })
	},
})

export const { setQuery, clearResults } = searchbarSlice.actions
export const selectSearch = (state: RootState) => state.search

export default searchbarSlice.reducer