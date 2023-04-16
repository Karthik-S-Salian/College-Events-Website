import { useState } from 'react';
import Header from '../Home/Header';
import "./style.css"

function EventEditor(){

    const [poster,setPoster]=useState();

    const [eventData,setEventData]=useState({
        title:"",
        description:"",
        poster:"",
        registration_link:"",
        location:"",
        timings:"",
        publish:false
    })

    async function postFinalForm() {
        /*
        ;
        ;
        const formdata=new FormData()
        Object.entries(eventData).forEach((key,value)=>{formdata.append(key,value)});

        const response = await fetch('http://127.0.0.1:8000/events/', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: formdata
        });

        const data2 = await response.json();
        console.log(data2);
        */
        const formDataAsArray = Object.entries(eventData);
        const formDataAsUrlEncoded = new URLSearchParams(formDataAsArray).toString()
        const response = await fetch(`http://127.0.0.1:8000/events/?${formDataAsUrlEncoded}`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
        });

        const data2 = await response.json();
        console.log(data2);
    }

    async function postPoster(){
        const formData = new FormData();
        formData.append('file', poster);
        const response = await fetch('http://127.0.0.1:8000/images', {
            method: 'POST',
            body: formData,
            headers: {
                //'Content-Type': 'multipart/form-data',
                /*'Authorization': `Bearer ${localStorage.getItem('access_token')}`*/
            }
        });

        const data = await response.json();
        console.log(data);
        setEventData(prevsData=>{return {...prevsData,"poster":data.filename}})
    }


    async function handleSubmit(event){
        event.preventDefault();
        await postPoster();
        await postFinalForm();
    }

    function handleChange(event){
        const {name,value}=event.target;
        setEventData(prevsData=>{
            return {
                ...prevsData,
                [name]:value
            }
        });
    }


    return (
        <>
        <Header/>
        <section id="event-editor">
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="title">Event Title</label>
                    <input 
                    type="text"
                    onChange={handleChange}
                    name="title"
                    />
                </div>

                <div>
                    <label htmlFor="poster">Poster</label>
                    <input
                        type="file"
                        name="poster"
                        onChange={(event)=>setPoster(event.target.files[0])}
                    />
                    {poster && (
                        <div>
                        <img
                            alt="not found"
                            width={"250px"}
                            src={URL.createObjectURL(poster)}
                        />
                        <br />
                        <button onClick={() => setPoster(null)} type="button">Remove</button>
                        </div>

                    )}
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                        <input 
                            type="textarea"
                            onChange={handleChange}
                            name="description"
                        />
                </div>

                <div>
                <label htmlFor="registration_link">Registration Link</label>
                    <input 
                        type="text"
                        onChange={handleChange}
                        name="registration_link"
                    />
                </div>
                <div>
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        name="location"
                    />
                </div>

                <div>
                <label htmlFor="timings">Timings</label>
                    <input
                        type="datetime-local"
                        onChange={handleChange}
                        name="timings"
                    />
                </div>
                
                <div className='button-container'> 
                    <button onClick={() => setEventData(prevsData=>{return {...prevsData,"publish":false}})}>Save Draft</button>
                    <button onClick={() => setEventData(prevsData=>{return {...prevsData,"publish":true}})}>Save</button>
                </div>
            </form>
        </section>
        </>
    );
}

export default EventEditor;
