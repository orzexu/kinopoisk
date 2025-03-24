import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useSelector } from 'react-redux'
import {
	addToFavorites,
	removeFromFavorites,
	selectFavorites,
} from '../addToFavSlice'

interface AddToFavoritesProps {
	movie: {
		imdbID: string
		Title: string
		Year: string
		Poster: string
	}
}

const AddToFavorites: React.FC<AddToFavoritesProps> = ({ movie }) => {
	const dispatch = useAppDispatch()
	const favorites = useSelector(selectFavorites)
	const [isFavorite, setIsFavorite] = useState(false)

	useEffect(() => {
		const isAlreadyAdded = favorites.some(
			fav => fav.imdbID === movie.imdbID
		)
		setIsFavorite(isAlreadyAdded)
	}, [favorites, movie.imdbID])

	const handleToggleFavorite = () => {
		if (isFavorite) {
			dispatch(removeFromFavorites(movie.imdbID))
		} else {
			dispatch(addToFavorites(movie))
		}
	}

	return (
		<button onClick={handleToggleFavorite} className="add-to-favorites">
			{isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
		</button>
	)
}

export default AddToFavorites