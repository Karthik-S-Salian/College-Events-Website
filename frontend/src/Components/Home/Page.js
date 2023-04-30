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
            fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/login/verify`, {
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
            .catch(error => {
            if (error.status===401)
                navigate("/login")
            else
                navigate("/network-error")
            });
        }
        else{
            navigate("/login")
        }   
    },[navigate])

    

    return (
        <div id='main-container'>
            <Header/>
            <Hero/>
            <Events 
            isAdmin={userData.is_admin}
            />
            <Footer/>
        </div>
    )
}

export default Page