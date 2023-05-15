import './style.css'
import { useState,useEffect} from 'react';
import { createSearchParams,Link } from "react-router-dom"

function EventCard(props){


    const options = { 
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', //just ommit which not needed
        hour12: true 
      };

    const [imageSourceUrl, setImageSourceUrl] = useState(null);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/images/${props.item.poster}`)
            .then(response => {return response.blob()})
            .then(blob=>{
                setImageSourceUrl(URL.createObjectURL(blob));})
    },[props.item.poster])
    return (
        <Link to={{
            pathname: "/event",
            search: `?${createSearchParams({
                id:props.item.id,
            })}`
          }}
          state={{ isAdmin: props.isAdmin }}
          >
            <div className="card-container">
                
                {imageSourceUrl&&<img className="card-img" src={imageSourceUrl} alt="airbnb logo"/>}
                <div className="card-description">
                    <p>{new Intl.DateTimeFormat('en-US', options).format(new Date(props.item.timings))}</p>
                    <p>{props.item.title}</p>
                </div>
            </div>
        </Link>
    );
}


export default EventCard;
