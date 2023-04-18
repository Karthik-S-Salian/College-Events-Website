import EventCard from './EventCard.js';
import './style.css';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import { useEffect,useState} from 'react';

function Events(props){
    const [cardsData,setCardsData]=useState([]);

    useEffect(()=>{

        async function fetchData(){
            await fetch('http://127.0.0.1:8000/events/', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
            })
            .then(response => {
                console.log(response)
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            })
            .then(data => setCardsData(data))
            .catch(error => {console.error("error",error)})
        }
        fetchData();
    },[])

    const card_collection=cardsData.map((item)=>{
        return <EventCard 
            key={item.id}
            item={item}
            />
    })

    

    return (
        <section className='cards-container'>
                {card_collection}
                {props.is_admin&&<Link to="/event-editor">
                    <div className="card-container" id="add-new">
                        <div>
                            <span>add</span>
                        </div>
                    </div>
                </Link>}
        </section>
    )

}

export default Events;