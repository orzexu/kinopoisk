import React from 'react'
import './../Favorites.css'
import { useSelector } from 'react-redux'
import { selectFavorites } from '../addToFavSlice'
import FavoritesCard from './FavoritesCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Mousewheel, Navigation, Scrollbar } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'


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
                    modules={[Navigation, Mousewheel, Scrollbar, Autoplay]}
					spaceBetween={16}
					slidesPerView={4}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                    centeredSlides={true}
                    loop={true}
                    scrollbar={{ draggable: true }}
					navigation
                    mousewheel
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
