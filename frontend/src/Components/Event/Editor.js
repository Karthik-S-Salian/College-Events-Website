import { useState } from 'react';
import Header from '../Home/Header';
import "./style.css"
import ReactQuill from 'react-quill';
import parse from 'html-react-parser';

function EventEditor(){

    const [poster,setPoster]=useState("");
    const [description,setDescription]=useState("");
    const [publish,setPublish]=useState(false)

    const eventData={
        title:"",
        registration_link:"",
        location:"",
        timings:"",
    }

    async function postFinalForm(fileName) {
        const formDataAsArray = Object.entries(eventData);
        formDataAsArray.push(["poster",fileName]);
        formDataAsArray.push(["description",description]);
        formDataAsArray.push(["publish",publish]);
        const formDataAsUrlEncoded = new URLSearchParams(formDataAsArray).toString()

        const response = await fetch(`http://127.0.0.1:8000/events/?${formDataAsUrlEncoded}`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
        });

        const data = await response.json();
        console.log(data);
    }

    async function postPoster(){
        const formData = new FormData();
        formData.append('file', poster);
        const response = await fetch('http://127.0.0.1:8000/images', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        return data.filename
    }


    async function handleSubmit(event){
        event.preventDefault();
        const fileName=await postPoster();
        await postFinalForm(fileName);
    }

    function handleChange(event){
        const {name,value}=event.target;
        eventData[name]=value;
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
                    <label htmlFor="description"  id='description-container'>Description</label>
                        <div id='description'>
                        <ReactQuill value={description} onChange={setDescription} className='rich-text-editor' />
                        </div> 
                </div>

                <div>
                    <label htmlFor="Preview">Preview</label>
                        <div name="Preview" id="preview"
                        >{parse(description)}</div>
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
                    {(!publish)&&(
                        <>
                            <button onClick={() => setPublish(false)}>Save Draft</button>
                            <button onClick={() => setPublish(true)}>Save</button>
                        </>
                    )}
                </div>
            </form>
        </section>
        </>
    );
}

export default EventEditor;
