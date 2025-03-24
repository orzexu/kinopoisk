import React, { useEffect, useState } from 'react'
import './Searchbar.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import {
	clearResults,
	getMovieDetails,
	searchMovies,
	selectSearch,
	setQuery,
} from '../searchbarSlice'
import MovieCard from './MovieCard'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import MovieDetails from './MovieDetails'

const Searchbar: React.FC = () => {
	const dispatch = useAppDispatch()
	const { query, results, selectedMovie, status, error } = useSelector(
		(state: RootState) => selectSearch(state)
	)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

	const [yearFilter, setYearFilter] = useState('')
	const [sortBy, setSortBy] = useState('')

	useEffect(() => {
		if (query.length >= 3) {
			dispatch(searchMovies({ query, year: yearFilter }))
			setIsModalOpen(true)
		} else {
			dispatch(clearResults())
			setIsModalOpen(false)
		}
	}, [query, yearFilter, dispatch])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setQuery(e.target.value))
	}

	const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setYearFilter(e.target.value)
	}

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSortBy(e.target.value)
	}

	const handleDetailsClick = async (imdbID: string) => {
		await dispatch(getMovieDetails(imdbID))
		setIsDetailsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		dispatch(clearResults())
	}

	const closeDetailsModal = () => {
		setIsDetailsModalOpen(false)
	}

	const sortedResults = [...results].sort((a, b) => {
		if (sortBy === 'rating') {
			return parseFloat(b.imdbRating) - parseFloat(a.imdbRating)
		} else if (sortBy === 'year') {
			return parseInt(b.Year) - parseInt(a.Year)
		}
		return 0
	})

	return (
		<div className="search">
			<input
				type="text"
				placeholder="Поиск..."
				value={query}
				onChange={handleInputChange}
			/>
			{status === 'loading' && <div className="loader"></div>}
			{isModalOpen && (
				<div className="modal-overlay" onClick={closeModal}>
					<div
						className="modal-content"
						onClick={e => e.stopPropagation()}
					>
						<select
							className="filter-select"
							value={yearFilter}
							onChange={handleYearChange}
						>
							<option value="">Все года</option>
							{Array.from(
								{ length: 50 },
								(_, i) => new Date().getFullYear() - i
							).map(year => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</select>
						<select
							className="sort-select"
							value={sortBy}
							onChange={handleSortChange}
						>
							<option value="">Сортировать по...</option>
							<option value="rating">Рейтингу</option>
							<option value="year">Дате выхода</option>
						</select>
						<button className="close-modal" onClick={closeModal}>
							&times;
						</button>
						{status === 'succeeded' && results.length === 0 && (
							<p>Фильмы не найдены</p>
						)}
						{status === 'succeeded' && results.length > 0 && (
							<div className="results">
								{sortedResults.map(movie => (
									<MovieCard
										key={movie.imdbID}
										movie={movie}
										onDetailsClick={handleDetailsClick}
									/>
								))}
							</div>
						)}
						{status === 'failed' && <p>{error}</p>}
						{isDetailsModalOpen && selectedMovie && (
							<MovieDetails
								movie={selectedMovie}
								onClose={closeDetailsModal}
							/>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default Searchbar
