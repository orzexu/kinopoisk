import React from 'react'
import './Header.css'
import Dropdown from '../../features/dropdown/components/Dropdown'
import Searchbar from '../../features/searchbar/components/Searchbar'

const Header: React.FC = () => {

	return (
		<>
			<header className="header">
				<div className="container">
					<Searchbar />
                    <Dropdown />
				</div>
			</header>
		</>
	)
}

export default Header