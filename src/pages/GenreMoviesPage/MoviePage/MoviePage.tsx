import React from 'react'
import './MoviePage.css'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/useAppSelector'


const MoviePage: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const movie = useAppSelector(state =>
		state.movies.movies.find(m => m.id.toString() === id)
	)

	if (!movie) return <div>Фильм не найден</div>

	return (
		<>
			<div className="moviePage-details">
				<div className="moviePage-poster">
					<img
						src={
							movie.poster?.url ||
							'https://motofishka24.ru/image/catalog/revolution/404error.jpg'
						}
						alt={movie.name}
					/>
				</div>
				<div className="moviePage-info">
					<h1>
						{movie.name || movie.alternativeName} ({movie.year})
					</h1>
					<p>
						<strong>Жанры:</strong>{' '}
						{movie.genres.map(genre => genre.name).join(', ')}
					</p>
					<p>
						<strong>Рейтинг:</strong>{' '}
						{movie.rating?.kp?.toFixed(1) || 'Н/Д'}
					</p>
					<p>
						<strong>Описание:</strong>{' '}
						{movie.description || 'Нет описания'}
					</p>
				</div>
			</div>
		</>
	)
}

export default MoviePage
