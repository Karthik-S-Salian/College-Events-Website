import { useState, useEffect } from 'react';
import Header from '../Home/Header';
import "./style.css"
import ReactQuill from 'react-quill';
import parse from 'html-react-parser';
import { useSearchParams,useNavigate} from "react-router-dom";

function EventEditor() {
    const navigate=useNavigate();
    const [searchParams] = useSearchParams();
    const [isPosterChanged,setIsPosterChanged]=useState(false);
    const [image,setImage]=useState();
    const [eventData, setEventData] = useState({
        id:searchParams.get("id"),
        title: "",
        registration_link: "",
        description: "",
        location: "",
        location_link:"",
        timings: "",
        publish: false,
        poster:null
    })

    useEffect(() => {
        window.scrollTo(0, 0);
        async function fetchData() {
            const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/events/${eventData.id}`, {
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
                .then(data =>data)
                .catch(error => { console.error("error", error) })

            await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/images/${data.poster}`)
                .then(response => { return response.blob() })
                .then(blob => {
                    setImage(blob)
                })

            setEventData(data);
        }
        if (eventData.id)
            fetchData();
    }, [eventData.id]);


    async function postFinalForm(fileName,publish) {

        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/events/${eventData.id?eventData.id:""}`, {
            method: eventData.id?"PUT":"POST",
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body:JSON.stringify({
                ...eventData,
                "publish": publish,
                "poster":fileName,
            })
        });

        const data = await response.json();
        setEventData(data);
    }

    async function postPoster() {
        const formData = new FormData();
        formData.append('file', image);
        const response = await fetch('http://127.0.0.1:8000/images', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        return data.filename;
    }


    async function handleSubmit(publish) {
        let fileName=eventData.poster;
        if(isPosterChanged)
            fileName = await postPoster();
        await postFinalForm(fileName,publish);

        setEventData(prevsData => {
            return {
                ...prevsData,
                "publish":publish
            }
        });
        navigate("/")
    }

    function handleChange(event) {
        const { name, value} = event.target;
        setEventData(prevsData => {
            return {
                ...prevsData,
                [name]:value
            }
        });
    }

    async function handleDelete() {
        alert("Are you sure once deleted cannot be restored");
        await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/events/${eventData.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then(response => {
                if (response.ok)
                    return response.json();
                return Promise.reject(response);
            })
            .catch(error => {
                console.error("error", error)
                if (error.status === 401)
                    navigate("/login")
                else
                    navigate("/")
            });
    }
    
    return (
        <>
            <Header />
            <section id="event-editor">
                <div className='form'>
                    <div>
                        <label htmlFor="title">Event Title</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="title"
                            value={eventData.title}
                        />
                    </div>

                    <div>
                        <label htmlFor="poster">Poster</label>
                        <input
                            type="file"
                            name="image"
                            onChange={(event)=>{
                                setImage(event.target.files[0]);
                                setIsPosterChanged(true);
                            }}
                        />
                        {image && (
                            <div>
                                <img
                                    alt="not found"
                                    width={"250px"}
                                    src={URL.createObjectURL(image)}
                                />
                                <br />
                                <button
                                    onClick={() =>setImage(null)}
                                    type="button">Remove</button>
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="description" id='description-container'>Description</label>
                        <div id='description'>
                            <ReactQuill value={eventData.description} onChange={data => setEventData(prevsData => { return { ...prevsData, description: data } })} className='rich-text-editor' />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="Preview">Preview</label>
                        <div name="Preview" id="preview"
                        >{parse(eventData.description)}</div>
                    </div>

                    <div>
                        <label htmlFor="registration_link">Registration Link</label>
                        <input
                            type="url"
                            onChange={handleChange}
                            name="registration_link"
                            value={eventData.registration_link}
                        />
                    </div>
                    <div>
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="location"
                            value={eventData.location}
                        />
                    </div>

                    <div>
                        <label htmlFor="location">Location link</label>
                        <input
                            type="url"
                            onChange={handleChange}
                            name="location_link"
                            value={eventData.location_link}
                        />
                    </div>

                    <div>
                        <label htmlFor="timings">Timings</label>
                        <input
                            type="datetime-local"
                            onChange={handleChange}
                            name="timings"
                            value={eventData.timings}
                        />
                    </div>

                    <div className='button-container'>
                                {(!eventData.publish) &&<button onClick={() => {handleSubmit(false)}}>Save Draft</button>}
                                {(eventData.publish) &&<button onClick={handleDelete}>DELETE</button>}
                                <button onClick={() => {handleSubmit(true) }}>Save</button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default EventEditor;
