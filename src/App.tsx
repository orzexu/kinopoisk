import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import GenreMoviesPage from './pages/GenreMoviesPage/GenreMoviesPage'
import HomePage from './pages/HomePage/HomePage'
import MoviePage from './pages/GenreMoviesPage/MoviePage/MoviePage'

function App() {
	return (
		<>
			<Header />
			<div className="container">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/genre/:genre" element={<GenreMoviesPage />} />
					<Route path="/movie/:id" element={<MoviePage />} />
				</Routes>
			</div>
		</>
	)
}

export default App
