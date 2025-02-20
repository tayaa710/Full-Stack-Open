import { useDispatch } from "react-redux"
import { newSearch } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    const searchQuery = event.target.value
    dispatch(newSearch(searchQuery))

  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter