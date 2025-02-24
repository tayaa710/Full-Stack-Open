/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NOTIFICATION":{
      console.log(action.payload)
      return `${action.payload}`
    }
    case "CLEAR":{
      return ""
    }
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, "")
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]} >
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext