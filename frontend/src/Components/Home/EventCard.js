import './style.css'
import { useState,useEffect} from 'react';
import { createSearchParams,Link } from "react-router-dom"

function EventCard(props){
    const [imageSourceUrl, setImageSourceUrl] = useState(null);
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/images/${props.item.poster}`)
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
          }}>
            <div className="card-container">
                
                {imageSourceUrl&&<img className="card-img" src={imageSourceUrl} alt="airbnb logo"/>}
                <div className="card-description">
                    <p>{props.item.timings}</p>
                    <p>{props.item.title}</p>
                </div>
            </div>
        </Link>
    );
}


export default EventCard;
