import React from 'react'
import './HomePage.css'
import FavoritesSlider from '../../features/addToFavorites/components/FavoritesSlider'

const HomePage:React.FC = () => {
  return (
    <>
        <section className="homepage">      
                <FavoritesSlider />
        </section>
    </>
  )
}

export default HomePage