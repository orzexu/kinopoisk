import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Movie {
  description: string;
  id: number;
  name: string;
  alternativeName: string;
  genres: Array<{ name: string }>;
  poster: {
    url: string;
    previewUrl: string;
  };
  rating: { 
    kp: number;
  };
  year: number;
  isSeries: boolean;
  countries: Array<{ name: string }>;
}

interface MoviesParams {
  page: number;
  limit: number;
  sortField: string;
  sortType: '1' | '-1';
  searchQuery: string;
  filters: {
    year: string;
    rating: string;
    isSeries: boolean | null;
    countries: string[];
  };
}

interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  currentGenre: string | null;
  params: MoviesParams;
  total: number;
}

const initialState: MoviesState = {
    movies: [],
    loading: false,
    error: null,
    currentGenre: null,
    total: 0,
    params: {
      page: 1,
      limit: 20,
      sortField: 'rating.kp',
      sortType: '-1',
      searchQuery: '',
      filters: {
        year: '',
        rating: '',
        isSeries: null,
        countries: [],
      },
    },
  };

  export const fetchMoviesByGenre = createAsyncThunk(
    'movies/fetchByGenre',
    async (_, { getState, rejectWithValue }) => {
      try {
        const { movies } = getState() as { movies: MoviesState };
        const { currentGenre, params } = movies;
  
        // Определяем базовые параметры для всех запросов
        const baseParams = {
          notNullFields: 'poster.url',
          page: params.page,
          limit: params.limit,
          sortField: params.sortField,
          sortType: params.sortType,
        };
  
        // Если есть поисковый запрос - используем эндпоинт поиска
        if (params.searchQuery) {
          const searchParams = {
            ...baseParams,
            query: params.searchQuery,
            // Для поиска можно добавить дополнительные фильтры
            ...(params.filters.year && { year: params.filters.year }),
            ...(params.filters.rating && { 'rating.kp': params.filters.rating }),
          };
  
          const response = await axios.get('https://api.kinopoisk.dev/v1.4/movie/search', {
            params: searchParams,
            headers: { 'X-API-KEY': 'D56ZVPS-6894FF6-K31S9MG-BGH6Q12' },
          });
  
          return {
            movies: response.data.docs,
            total: response.data.total,
          };
        }
        
        // Если нет поискового запроса - обычный запрос по жанру
        const genreParams = {
          ...baseParams,
          'genres.name': currentGenre,
          ...(params.filters.year && { year: params.filters.year }),
          ...(params.filters.rating && { 'rating.kp': params.filters.rating }),
          ...(params.filters.isSeries !== null && { isSeries: params.filters.isSeries }),
          ...(params.filters.countries.length > 0 && {
            'countries.name': params.filters.countries.join(','),
          }),
        };
  
        const response = await axios.get('https://api.kinopoisk.dev/v1.4/movie', {
          params: genreParams,
          headers: { 'X-API-KEY': 'D56ZVPS-6894FF6-K31S9MG-BGH6Q12' },
        });
  
        return {
          movies: response.data.docs,
          total: response.data.total,
        };
      } catch (error) {
        console.error('Ошибка запроса:', error);
        return rejectWithValue('Ошибка загрузки фильмов');
      }
    }
  );

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setParams: (state, action: PayloadAction<Partial<MoviesParams>>) => {
        state.params = {
          ...state.params,
          ...action.payload
        };
      },
    updateParams: (state, action: PayloadAction<Partial<MoviesParams>>) => {
      state.params = {
        ...state.params,
        ...action.payload,
      };
    },
    resetFilters: (state) => {
      state.params = {
        ...state.params,
        filters: initialState.params.filters,
        searchQuery: '',
        sortField: 'rating.kp',
        sortType: '-1',
        page: 1,
      };
    },
    setCurrentGenre: (state, action: PayloadAction<string>) => {
      state.currentGenre = action.payload;
      state.params.page = 1; // Сброс страницы при смене жанра
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesByGenre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.movies;
        state.total = action.payload.total;
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Экспортируем все экшены
export const { 
  setParams, 
  updateParams, 
  resetFilters, 
  setCurrentGenre 
} = moviesSlice.actions;

export default moviesSlice.reducer;