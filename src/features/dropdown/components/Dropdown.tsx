
import './Dropdown.css'
import { useDispatch, useSelector } from "react-redux"
import { closeDropdown, toggleDropdown } from "../dropdownSlice"
import { RootState } from "../../../app/store"

const Dropdown: React.FC = () => {
    const dispatch = useDispatch()
    const isOpen = useSelector((state: RootState) => state.dropdown.isOpen)

    const handleToggle = () => {
        dispatch(toggleDropdown())
    }

    const handleClose = () => {
        dispatch(closeDropdown())
    }

    return (
        <div className="dropdown">
            <button className="dropdown-button" onClick={handleToggle}>
                Категории
            </button>
            {isOpen && (
                <div className="dropdown-content" onMouseLeave={handleClose}>
                    <a href="#">Категория 1</a>
                    <a href="#">Категория 2</a>
                    <a href="#">Категория 3</a>
                </div>
            )}
        </div>
    )
}

export default Dropdown