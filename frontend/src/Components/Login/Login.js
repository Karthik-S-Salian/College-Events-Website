import "./style.css"
import { useState } from 'react';
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login(){
    const [isLogin,setIsLogin]=useState(true);
    const navigate=useNavigate();

    const [credentials,setCredentials]=useState({
        name:"",
        email:"",
        password:""
    })

    function handleChange(event){
        const {name,value,type,checked}=event.target;
        setCredentials(prevsData=>{
            return {
                ...prevsData,
                [name]:type==="checkbox"?checked:value
            }
        });
    }

    async function submitToServer(){
        if(isLogin)
            return await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `username=${encodeURIComponent(credentials.email)}&password=${encodeURIComponent(credentials.password)}&grant_type=`,
                })
                .then(response =>  {
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(response);
                })
        else
            return await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/login/signin`, {
                method: 'POST',
                headers: {  'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
                })
    }

    async function verify(){
        try{
            const response = await submitToServer();
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('access_token', data.access_token);
                navigate("/")
            }
            Promise.reject(response)

        }catch(error){
            setCredentials({})
            if(error.status===403)
                alert("INVALID CREDENTIALS")  
            else
                navigate("/network-error")
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        verify();
    }

    return (
        <div id="login">
            <div className="login-container">
                <h1>Welcome</h1>
                <div>Welcome Back, Please Enter your details</div>
                <form onSubmit={handleSubmit}>

                    {!isLogin && (<div>
                        <label htmlFor="name">Name</label>
                        <input type="text"
                        onChange={handleChange}
                        name="name"
                        />   
                    </div>)}

                    <div>
                        <label htmlFor="email">Email</label>
                        <input 
                        type="email" 
                        placeholder="example@mail.com"
                        onChange={handleChange}
                        name="email"
                        />   
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password"
                        onChange={handleChange}
                        name="password"
                        /> 
                    </div>
                    <div className="extra-options-container">
                        <span>
                            <input type="checkbox"/> 
                            <label htmlFor="radio" className="remember-checkbox">Remember on this Device</label>
                        </span>
                        {isLogin && (
                            <span>
                                <a href="https://">Forget Password</a>
                            </span>
                        )}
                        
                    </div>

                    <button className="sign-in">{isLogin?"Login":"Sign in"}</button>
                    
                    
                </form>

                <div className="sign-up-container">
                    {isLogin?(
                        <>
                        <span>Dont have an account? </span>
                        <span className="sign-up" onClick={()=>setIsLogin(false)}>Sign up for free</span>
                        </>
                    ):(
                        <>
                        <span>Already have an account? </span>
                        <span  className="sign-up" onClick={()=>setIsLogin(true)}>login</span>
                        </>
                    )}
                    
                </div>
            </div>
    </div>
    )
}


export default Login;