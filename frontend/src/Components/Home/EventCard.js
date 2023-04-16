import './style.css'

function EventCard(props){
    return (
            <div className="card-container">
                <img className="card-img" src={props.item.focus_image} alt="airbnb logo"/>
                <div className="card-description">
                    <p>{props.item.timmings}</p>
                    <p>{props.item.title}</p>
                </div>
            </div>
    );
}


export default EventCard;
