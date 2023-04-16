import Header from './Header.js';
import Hero from './Hero.js';
import './style.css';
import Events from './Events.js';
import Footer from './Footer.js';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function verifyUser(navigate){
    let token=localStorage.getItem("access_token")
    console.log(token)
    if(token){
        fetch('http://127.0.0.1:8000/login/verify', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
        }
        })
        .then(response => {
            console.log(response)
            if (response.ok) {
                return response.json();
              }
              return Promise.reject(response);
        })
        .then(
            data => {
                localStorage.setItem('access_token', data.access_token);
            }
        )
        .catch(error => {console.error("error",error)
        if (error.status===401)
            navigate("/login")
        });
    }
    else{
        navigate("/login")
    }    
    return token;
}

function Page(){
    const navigate = useNavigate();
    const token=verifyUser(navigate);

    return (
        <div id='main-container'>
            <Header/>
            <Hero/>
            <Events/>
            <Footer/>
        </div>
    )
}

export default Page