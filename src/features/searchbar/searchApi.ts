import axios from "axios"

const API_KEY = '811dc449'
const BASE_URL = 'https://www.omdbapi.com/'

export const fetchMovies = async (query: string, year?: string) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                apikey: API_KEY,
                s: query,
                y: year,
            }
        })

        if (response.data.Response === 'True') {
            const movieWithDetails = await Promise.all(
                response.data.Search.map(async (movie: any) => {
                    const detailsResponse = await axios.get(BASE_URL, {
                        params: {
                            apikey: API_KEY,
                            i: movie.imdbID,
                        }
                    })
                    return {
                        ...movie,
                        imdbRating: detailsResponse.data.imdbRating || 'N/A'
                    }
                })
            )
            return movieWithDetails
        } else {
            throw new Error(response.data.Error || 'Фильмы не найдены')
        }
    } catch (error) {
        throw new Error('Ошибка при запросе к Api')
    }
}

export const fetchMovieDetails = async (imdbID: string) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                apikey: API_KEY,
                i: imdbID
            }
        })
        if (response.data.Response === 'True') {
            return response.data
        } else {
            throw new Error(response.data.Error || 'Информация о фильме не найдена')
        }
    } catch (error) {
        throw new Error('Ошибка при запросе к Api')
    }
}