import PropTypes from 'prop-types'
import { useState, useImperativeHandle, forwardRef } from 'react'

const TogglableBlog = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {
    display: visible ? 'none' : '',
    border: visible ? 'none' : '2px solid black',
    marginTop: visible ? '0' : '3px',
    marginBottom: visible ? '0' : '3px',
    padding: visible ? '0' : '2px'
  }
  const showWhenVisible = {
    display: visible ? '' : 'none',
    border: visible ? '2px solid black' : 'none',
    marginTop: visible ? '3px' : '0',
    marginBottom: visible ? '3px' : '0',
    padding: visible ? '2px' : '0'
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        {props.blogTitle} {props.blogAuthor}&nbsp;
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.blogTitle} {props.blogAuthor}&nbsp;
        <button onClick={toggleVisibility}>{props.buttonLabelExit}</button>
        {props.children}
      </div>
    </div>
  )
})

TogglableBlog.displayName = 'TogglableBlog'

TogglableBlog.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  buttonLabelExit: PropTypes.string.isRequired,
  blogTitle: PropTypes.string.isRequired,
  blogAuthor: PropTypes.string.isRequired
}

export default TogglableBlog