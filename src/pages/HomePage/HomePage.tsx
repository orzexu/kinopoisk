import React from 'react'
import FavoritesSlider from '../../features/addToFavorites/components/FavoritesSlider'

const HomePage:React.FC = () => {
  return (
    <>
        <section className="homepage">
            <div className="container">
                <FavoritesSlider />
            </div>
        </section>
    </>
  )
}

export default HomePage