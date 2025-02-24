import { useContext } from "react"
import NotificationContext from "../NotificationContext"
const Notification = () => {
const [notification, reducer] = useContext(NotificationContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notification === "") return null

  return (
    <div style={style}>
      {`anecdote '${notification}' voted`}
    </div>
  )
}

export default Notification
