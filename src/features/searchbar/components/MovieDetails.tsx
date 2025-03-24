import React from 'react'
import { Rating } from '../searchbarSlice'
import AddToFavorites from '../../addToFavorites/components/AddToFavorites'

interface MovieDetailsProps {
    movie: {
        imdbID: string
            Title: string
            Year: string
            Poster: string
            Plot: string
            Actors: string
            Director: string
            Genre: string
            Runtime: string
            Ratings?: Rating[]
    }
    onClose: () => void
}

const MovieDetails:React.FC<MovieDetailsProps> = ({movie, onClose}) => {

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>
        <div className="movie-details">
          <img src={movie.Poster} alt={movie.Title} />
          <div className="details-info">
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
            <AddToFavorites movie={movie} />
            <p><strong>Описание:</strong> {movie.Plot}</p>
            <p><strong>Актеры:</strong> {movie.Actors}</p>
            <p><strong>Режиссер:</strong> {movie.Director}</p>
            <p><strong>Жанр:</strong> {movie.Genre}</p>
            <p><strong>Продолжительность:</strong> {movie.Runtime}</p>
            {movie.Ratings && movie.Ratings.length > 0 && (
              <div className="ratings">
                <h3>Рейтинги:</h3>
                {movie.Ratings.map((rating, index) => (
                  <div key={index} className="rating">
                    <strong>{rating.Source}:</strong> {rating.Value}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails