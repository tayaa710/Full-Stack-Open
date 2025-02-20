import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: 'filter',
  initialState: "",
  reducers: {
    newSearch(state, action) {
      return action.payload
    }
  }
})

export const { newSearch } = filterSlice.actions
export default filterSlice.reducer