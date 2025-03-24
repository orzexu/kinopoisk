import React from 'react'
import { Movie } from '../searchbarSlice'
import AddToFavorites from '../../addToFavorites/components/AddToFavorites'


interface MovieCardProps {
	movie: Movie
    onDetailsClick: (imdbID: string) => void
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onDetailsClick }) => {
	const posterUrl =
		movie.Poster !== 'N/A'
			? movie.Poster
			: 'https://motofishka24.ru/image/catalog/revolution/404error.jpg'

	return (
		<div className="movie-card">
			<img src={posterUrl} alt={movie.Title} />
			<div className="movie-card-desc">
				<h3>{movie.Title}</h3>
				<ul>
					<li>Год выхода: {movie.Year}</li>
					<li>Тип: {movie.Type} </li>
				</ul>
			</div>
            <div className="movie-card-btns">
                <AddToFavorites movie={movie} />
                <button onClick={() => onDetailsClick(movie.imdbID)}>Подробное описание</button>
            </div>
		</div>
	)
}

export default MovieCard
