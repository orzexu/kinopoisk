import React from 'react'
import './Header.css'
import Dropdown from '../../features/dropdown/components/Dropdown'
import Searchbar from '../../features/searchbar/components/Searchbar'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {

	return (
		<>
			<header className="header">
				<div className="container">
                    <Link to={'/'} >
                    <img src="/icon.png" alt="home" className='homeIcon' />
                    </Link>
					<Searchbar />
                    <Dropdown />
				</div>
			</header>
		</>
	)
}

export default Header