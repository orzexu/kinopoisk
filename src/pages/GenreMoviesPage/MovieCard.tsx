import React from 'react'
import { Link } from 'react-router-dom'

interface MovieCardProps {
	movie: {
		alternativeName: string
		id: number
		name: string
		poster: {
			url: string
			previewUrl: string
		}
		rating: {
			kp: number
		}
		year: number
	}
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
	return (
		<Link to={`/movie/${movie.id}`} className="movie-card-genre">
			<div className="movie-rating-badge">
				{movie.rating.kp.toFixed(1)}
			</div>
			<img
				src={
					movie.poster?.url ||
					movie.poster?.previewUrl ||
					'https://motofishka24.ru/image/catalog/revolution/404error.jpg'
				}
				alt={movie.name || movie.alternativeName}
			/>
			<div className="movie-info-genre">
				<h3>{movie.name || movie.alternativeName}</h3>
				<p>Год: {movie.year}</p>
				<p>Рейтинг: {movie.rating?.kp?.toFixed(1) || 'Н/Д'}</p>
			</div>
		</Link>
	)
}

export default MovieCard
