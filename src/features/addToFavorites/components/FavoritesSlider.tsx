import React from 'react'
import './../Favorites.css'
import { useSelector } from 'react-redux'
import { selectFavorites } from '../addToFavSlice'
import FavoritesCard from './FavoritesCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'


const FavoritesSlider: React.FC = () => {
	const favorites = useSelector(selectFavorites)

	if (favorites.length === 0) {
		return <p>Нет избранных фильмов</p>
	}

	return (
		<>
			<div className="favorites-slider-container">
            <h2>Избранное</h2>
				<Swiper
                    modules={[Navigation, Pagination]}
					spaceBetween={16}
					slidesPerView={4}
					navigation
					pagination={{ clickable: true }}
					breakpoints={{
						320: {
							slidesPerView: 1,
						},
						768: {
							slidesPerView: 2,
						},
						1024: {
							slidesPerView: 4,
						},
					}}
				>
					{favorites.map(movie => (
						<SwiperSlide key={movie.imdbID}>
							<FavoritesCard movie={movie} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	)
}

export default FavoritesSlider
