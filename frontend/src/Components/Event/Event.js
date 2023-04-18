import "./style.css"
import { useSearchParams,Link} from "react-router-dom";
import { useEffect,useState } from "react";
import Header from '../Home/Header';
import Footer from '../Home/Footer';


function Event(){
    const [searchParams, setSearchParams] = useSearchParams();
    const id=searchParams.get("id")
    const [eventData,setEventData]=useState({});

    useEffect(() => {

        window.scrollTo(0, 0);
        async function fetchData(){
            const data = await fetch(`http://127.0.0.1:8000/events/${id}`, {
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
            .catch(error => {console.error("error",error)})

            await fetch(`http://127.0.0.1:8000/images/${data.poster}`)
            .then(response => {return response.blob()})
            .then(blob=>{
                setEventData({
                        ...data,
                        poster:URL.createObjectURL(blob)
                    }
                );})
        }
        
        fetchData();
      }, [id]);

    const detailArray=[];

    for(const [key,value] of Object.entries(eventData)){
        detailArray.push((
            <div>
                <h2>{key}</h2>
                <p>
                    {value}
                </p>
            </div>
        ))
    }

    return (
        <>
            <Header/>
            <section id="event">
                <h1>{eventData.title}</h1>
                {eventData.poster&&<img src={eventData.poster} alt="event poster"/>}
                <p>
                    {eventData.description}
                </p>

                <h5>{eventData.registration_link}</h5>
                <h5>{eventData.location}</h5>
                
            

            </section>
            <Link to="/">
                <section id="backButton">BACK TO HOME</section>
            </Link>  
            <Footer/>
        </>
        
    );
}


export default Event;