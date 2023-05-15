import "./style.css"
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import parse from 'html-react-parser';
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import locationImage from "../../icons/location.png"


function Event() {
    const [searchParams,] = useSearchParams();
    const isAdmin = useLocation().state.isAdmin;
    const id = searchParams.get("id")
    const [eventData, setEventData] = useState({});
    const navigate = useNavigate();


    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric', //just ommit which not needed
        hour12: true
    };

    useEffect(() => {

        window.scrollTo(0, 0);
        async function fetchData() {
            const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/events/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(response);
                })
                .then(data => data)
                .catch(error => { console.error("error", error) })

            await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/images/${data.poster}`)
                .then(response => { return response.blob() })
                .then(blob => {
                    setEventData({
                        ...data,
                        poster: URL.createObjectURL(blob)
                    }
                    );
                })
        }

        fetchData();
    }, [id]);

    const detailArray = [];

    for (const [key, value] of Object.entries(eventData)) {
        detailArray.push((
            <div>
                <h2>{key}</h2>
                <p>
                    {value}
                </p>
            </div>
        ))
    }

    async function handleDelete() {
        alert("Are you sure once deleted cannot be restored");
        await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/events/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            }).then(data => {

            }
            )
            .catch(error => {
                console.error("error", error)
                if (error.status === 401)
                    navigate("/login")
                else
                    navigate("/")
            });


    }
    console.log(eventData)

    return (
        <>
            <Header />
            <div id="event">

                <section>
                    <h1>{eventData.title}</h1>
                </section>
                <section>
                    {eventData.poster && <img src={eventData.poster} alt="event poster" className="poster" />}
                </section>


                <section id="quick-links-container">
                    {eventData.timings && <span><strong>timings : </strong>{new Intl.DateTimeFormat('en-US', options).format(new Date(eventData.timings))}</span>}
                    {(eventData.location || eventData.location_link) && (
                        <span className="location-container">
                            <img src={locationImage} className="loaction-icon" alt="location" />
                            <a href={eventData.location_link} rel="noreferrer" target="_blank">{eventData.location ? eventData.location : "Click here to view in map"}</a>
                        </span>)}
                    {eventData.registration_link && <span><strong>registration link : </strong>  <a href={eventData.registration_link}>Click here to join</a></span>}
                </section>

                <section>
                    {eventData.description ? parse(eventData.description) : null}
                </section>

            </div>

            {isAdmin && (<section id="edit-event-buttons-container">
                <button onClick={() => navigate(`/event-editor?id=${id}`)}>EDIT</button>
                <button onClick={handleDelete}>DELETE</button>
            </section>)}

            <Footer />
        </>

    );
}


export default Event;