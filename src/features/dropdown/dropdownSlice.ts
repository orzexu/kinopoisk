import { createSlice } from "@reduxjs/toolkit"

interface DropdownState {
    isOpen: boolean
}

const initialState: DropdownState = {
    isOpen: false
}

const dropdownSlice = createSlice({
    name: 'dropdown',
    initialState,
    reducers: {
        openDropdown: (state) => {
            state.isOpen = true
        },
        closeDropdown: (state) => {
            state.isOpen = false
        },
        toggleDropdown: (state) => {
            state.isOpen = !state.isOpen
        }
    }
})

export const { openDropdown, closeDropdown, toggleDropdown } = dropdownSlice.actions
export default dropdownSlice.reducer