import EventCard from './EventCard.js';
import './style.css';
import data from './data';
import { Link } from 'react-router-dom';

function Events(){
    const card_collection=data.map((item)=>{
        return <EventCard 
            key={item.id}
            item={item}
            />
    })

    

    return (
        <section className='cards-container'>
                {card_collection}
                <Link to="/event-editor">
                    <div className="card-container" id="add-new">
                        <div>
                            <span>add</span>
                        </div>
                    </div>
                </Link>
        </section>
    )

}

export default Events;