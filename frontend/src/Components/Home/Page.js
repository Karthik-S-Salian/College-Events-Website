import Header from './Header.js';
import Hero from './Hero.js';
import './style.css';
import Events from './Events.js';
import Footer from './Footer.js';
import { useEffect ,useState} from 'react';
import { useNavigate } from "react-router-dom";

function Page(){
    const navigate = useNavigate();
    const [userData,setUserData]=useState("")

    useEffect(()=>{
        
        const token=localStorage.getItem("access_token");
        if(token){
            fetch('http://127.0.0.1:8000/login/verify', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                  }
                  return Promise.reject(response);
            })
            .then(
                data => {
                    localStorage.setItem('access_token', data.access_token);
                    console.log(data)
                    setUserData(data);
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
    },[])

    

    return (
        <div id='main-container'>
            <Header/>
            <Hero/>
            <Events 
            is_admin={userData.is_admin}
            />
            <Footer/>
        </div>
    )
}

export default Page