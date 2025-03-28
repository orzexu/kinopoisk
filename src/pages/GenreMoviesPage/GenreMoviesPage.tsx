import '@ant-design/v5-patch-for-react-19'
import {
	Button,
	Checkbox,
	CheckboxChangeEvent,
	Col,
	Input,
	Pagination,
	Row,
	Select,
	Spin,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import MovieCard from './MovieCard'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import './genrePage.css'
import {
	fetchMoviesByGenre,
	resetFilters,
	setCurrentGenre,
	setParams,
} from './moviesSlice'

const { Option } = Select
const { Search } = Input

const GenreMoviesPage: React.FC = () => {
	const { genre } = useParams<{ genre: string }>()
	const dispatch = useAppDispatch()
	const { movies, loading, error, total, params } = useAppSelector(
		state => state.movies
	)

	const [searchInput, setSearchInput] = useState(params.searchQuery)
	const [yearInput, setYearInput] = useState(params.filters.year)
	const [ratingInput, setRatingInput] = useState(params.filters.rating)

	// Дебаунс для поиска (500ms)
	const debouncedSearch = useDebouncedCallback((value: string) => {
		dispatch(
			setParams({
				searchQuery: value,
				page: 1,
			})
		)
	}, 500)

	// Дебаунс для года (500ms)
	const debouncedYearChange = useDebouncedCallback((value: string) => {
		dispatch(
			setParams({
				filters: {
					...params.filters,
					year: value,
				},
				page: 1,
			})
		)
	}, 500)

	// Дебаунс для рейтинга (500ms)
	const debouncedRatingChange = useDebouncedCallback((value: string) => {
		dispatch(
			setParams({
				filters: {
					...params.filters,
					rating: value,
				},
				page: 1,
			})
		)
	}, 500)

	// Инициализация жанра
	useEffect(() => {
		if (genre) {
			dispatch(setCurrentGenre(genre))
			dispatch(resetFilters())
		}
	}, [genre, dispatch])

	// Загрузка фильмов при изменении параметров
	useEffect(() => {
		if (genre) {
			dispatch(fetchMoviesByGenre())
		}
	}, [genre, params, dispatch])

	const handlePageChange = (page: number, pageSize?: number) => {
		dispatch(
			setParams({
				page,
				...(pageSize && { limit: pageSize }),
			})
		)
	}

	const handleSortChange = (value: string) => {
		const [sortField, sortType] = value.split('|') as [string, '1' | '-1']
		dispatch(
			setParams({
				sortField,
				sortType,
				page: 1,
			})
		)
	}

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setSearchInput(value)
		debouncedSearch(value)
	}

	const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (/^[\d-]*$/.test(value)) {
			setYearInput(value)
			debouncedYearChange(value)
		}
	}

	const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setRatingInput(value)
		debouncedRatingChange(value)
	}

	const handleIsSeriesChange = (e: CheckboxChangeEvent) => {
		dispatch(
			setParams({
				filters: {
					...params.filters,
					isSeries: e.target.checked || null,
				},
				page: 1,
			})
		)
	}

	const handleResetFilters = () => {
		dispatch(resetFilters())
		setSearchInput('')
	}

	if (error) return <div className="error">{error}</div>

	return (
		<div className="genre-movies">
			<h1>Фильмы в жанре: {genre}</h1>

			<div className="controls">
				<Row gutter={[16, 16]} align="middle">
					<Col xs={24} md={8}>
						<Search
							placeholder="Поиск по названию"
							allowClear
							enterButton="Найти"
							value={searchInput}
							onChange={handleSearchChange}
							onSearch={value => debouncedSearch(value)}
						/>
					</Col>

					<Col xs={24} md={8}>
						<Select
							style={{ width: '100%' }}
							value={`${params.sortField}|${params.sortType}`}
							onChange={handleSortChange}
						>
							<Option value="rating.kp|-1">
								По рейтингу (убыв.)
							</Option>
							<Option value="rating.kp|1">
								По рейтингу (возр.)
							</Option>
							<Option value="year|-1">По году (новые)</Option>
							<Option value="year|1">По году (старые)</Option>
						</Select>
					</Col>

					<Col xs={24} md={8}>
						<Button onClick={handleResetFilters}>
							Сбросить фильтры
						</Button>
					</Col>
				</Row>

				<Row gutter={[16, 16]} style={{ marginTop: 16 }}>
					<Col xs={12} sm={6}>
						<Input
							placeholder="Год (например: 2020 или 2010-2020)"
							value={yearInput}
							onChange={handleYearChange}
						/>
					</Col>

					<Col xs={12} sm={6}>
						<Input
							placeholder="Рейтинг от (например: 7 или 7-10)"
							value={ratingInput}
							onChange={handleRatingChange}
						/>
					</Col>

					<Col xs={12} sm={6}>
						<Checkbox
							checked={params.filters.isSeries === true}
							onChange={handleIsSeriesChange}
						>
							Только сериалы
						</Checkbox>
					</Col>
				</Row>
			</div>

			<Spin spinning={loading} delay={300}>
				<div className="movies-grid">
					{movies.map(movie => (
						<MovieCard key={movie.id} movie={movie} />
					))}
				</div>
			</Spin>

			{total > 0 && (
				<div className="pagination">
					<Pagination
						current={params.page}
						total={total}
						pageSize={params.limit}
						onChange={handlePageChange}
						showSizeChanger
						onShowSizeChange={handlePageChange}
						pageSizeOptions={['10', '20', '50', '100']}
					/>
				</div>
			)}
		</div>
	)
}

export default GenreMoviesPage
