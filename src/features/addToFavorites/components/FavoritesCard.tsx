import React from 'react';
import './../Favorites.css';
import AddToFavorites from './AddToFavorites';

interface FavoritesCardProps {
  movie: {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
  };
}

const FavoritesCard: React.FC<FavoritesCardProps> = ({ movie }) => {
  return (
    <div className="favorite-movie-card">
      <img src={movie.Poster} alt={movie.Title} className="favorite-movie-poster" />
      <div className="favorite-movie-info">
        <h3 className="favorite-movie-title">{movie.Title}</h3>
        <p className="favorite-movie-year">{movie.Year}</p>
        <AddToFavorites movie={movie} />
      </div>
    </div>
  );
};

export default FavoritesCard;