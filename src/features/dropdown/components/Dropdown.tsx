import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import {
	resetFilters,
	setCurrentGenre,
} from '../../../pages/GenreMoviesPage/moviesSlice'
import './Dropdown.css'

const GenreDropdown: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const [selectedGenre, setSelectedGenre] = useState('')
	const genres = [
		'боевик',
		'комедия',
		'фантастика',
		'ужасы',
		'триллер',
		'драма',
		'криминал',
		'детектив',
		'аниме',
	]

	const handleGenreSelect = (genre: string) => {
		setSelectedGenre(genre) // Устанавливаем выбранный жанр
		dispatch(setCurrentGenre(genre))
		dispatch(resetFilters())
		navigate(`/genre/${genre}`)
		setSelectedGenre('') // Сбрасываем после навигации
	}

	return (
		<div className="genre-dropdown">
			<select
				value={selectedGenre}
				onChange={e => handleGenreSelect(e.target.value)}
			>
				<option value="" disabled>
					Выберите жанр
				</option>
				{genres.map(genre => (
					<option key={genre} value={genre}>
						{genre}
					</option>
				))}
			</select>
		</div>
	)
}

export default GenreDropdown
