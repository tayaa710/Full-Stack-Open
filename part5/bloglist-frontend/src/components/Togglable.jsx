import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    if (props.needsToggler){
      props.setToggler(!visible)
    }
  }


  useImperativeHandle(refs, () => {
    return {
      toggleVisibility, visible
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.showButtonLabel}</button>
      </div>
      <div style={showWhenVisible}>

        {props.children}
        <button onClick={toggleVisibility}>{props.hideButtonLabel}</button>
      </div>
    </div>
  )
})

export default Togglable