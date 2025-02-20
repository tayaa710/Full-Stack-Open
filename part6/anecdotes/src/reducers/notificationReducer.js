import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    addNotification(state, action) {
      return action.payload
    },

    removeNotification() {
      return ""
    }
  }

})
export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(addNotification(message))
    setTimeout(() => dispatch(removeNotification()), time * 1000)
  }
}
export default notificationSlice.reducer