import EventCard from './EventCard.js';
import './style.css';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Events(props) {
    const [cardsData, setCardsData] = useState([]);
    const [locationData, setLocationData] = useState({
        "latitude": null,
        "longitude": null
    });

    useEffect(() => {

        async function fetchData() {
            await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/events/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Latitude': locationData.latitude ? locationData.latitude.toString() : undefined,
                    'Longitude': locationData.longitude ? locationData.longitude.toString() : undefined,
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(response);
                })
                .then(data => setCardsData(data))
                .catch(error => { console.error("error", error) })
        }


        fetchData();

    }, [locationData.latitude, locationData.longitude])

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else
            toast.warning("Geolocation is not supported by this browser.");

        function showPosition(position) {
            setLocationData({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
            console.log(position.coords.latitude, position.coords.longitude)
        }

        function showError(error) {

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    toast.warning("Location permission is required for some features");
                    break;
                case error.POSITION_UNAVAILABLE:
                    toast.warning("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    toast.warning("The request to get user location timed out.");
                    break;
                default:
                    toast.warning("An unknown error occurred.");

            }
        }
    }, [])

    const card_collection = cardsData.map((item) => {
        return <EventCard
            key={item.id}
            item={item}
            isAdmin={props.isAdmin}
        />
    })



    return (
        <section className='cards-container'>
            {card_collection}
            {props.isAdmin && <Link to="/event-editor">
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