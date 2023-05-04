import PropTypes from 'prop-types'

const AlertTypes = {
    "success":{
        "icon":"fa-check-circle",
        "defaultMessage":"Success"
    },
    "error":{
        "icon":"fa-times-circle",
        "defaultMessage":"Error"
    },
    "info":{
        "icon":"fa-info-circle",
        "defaultMessage":"Info"
    },
    "warning":{
        "icon":"fa-exclamation-circle",
        "defaultMessage":"Warning"
    },
    "alert":{
        "icon":"fa-exclamation-triangle",
        "defaultMessage":"Alert"
    },
  }

function Alert(props) {
    return (
        <div class="alert-container wrapper-success">
        <div class="card">
          <div class="icon"><i class={`fas ${AlertTypes[props.type].icon}`}></i></div>
          <div class="subject">
            <h3>{props.title?title:AlertTypes[props.type].defaultMessage}</h3>
            <p>{props.description}</p>
          </div>
          <div class="icon-times"><i class="fas fa-times"></i></div>
        </div>
      </div>
    )
}

Alert.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type:PropTypes.oneOf(Object.keys(AlertTypes))       //PropTypes.oneOf(['News', 'Photos'])
}
/*
Alert.defaultProps = {
    title: 'Set title here',
    aboutText: 'About'
  };
*/
export default Alert;