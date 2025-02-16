import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const App = () => {

  console.log(store.getState())



  return (
    <div>
      <div className="buttonBarContainer">
        <button onClick={() => store.dispatch({ type: 'GOOD' })}>good</button>
        <button onClick={() => store.dispatch({ type: 'OK' })}>ok</button>
        <button onClick={() => store.dispatch({ type: 'BAD' })}>bad</button>
        <button onClick={() => store.dispatch({ type: 'ZERO' })}>reset stats</button>
      </div>
      <div className="statsContainer">
        <p>Good: {store.getState().good}</p>
        <p>Ok: {store.getState().ok}</p>
        <p>Bad: {store.getState().bad}</p>
      </div>
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()

store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
  renderApp()
})
