import React from 'react'
import errorImage from '../../images/error.jpg'
import "./style.css"

function NetworkError() {
  return (
    <div id="network-error" style={{"backgroundImage":`url(${errorImage})`}}></div>
  )
}

export default NetworkError;
