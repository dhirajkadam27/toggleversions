import './index.css';
import Nav from './Nav';

import React, { useState, useEffect, useRef } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Signup() {



    const [run, setRun] = useState(1);
    const [profile, setProfile] = useState([]);
    const emailRef = useRef(null);
    const nameRef = useRef(null);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => { localStorage.setItem('token', codeResponse.access_token); setRun(run + 1) },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            var token = localStorage.getItem('token');
            if(localStorage.getItem('userid')){
                window.location.href = '/sites/'+localStorage.getItem('userid')
            }
            if (token) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                         axios.post('http://localhost:8080/api/v1/auth/checkuser',{
                            email: res.data.email
                        }).then((result)=>{
                            console.log(result.data);
                            if(result.data.message==="User not found"){
                                setProfile(res.data);
                            }else if(result.data.message==="User found"){
                                localStorage.setItem('userid',result.data.userid);
                                window.location.href = '/sites/'+result.data.userid
                            }
                        })
                    })
                    .catch((err) => console.log(err));
            }
        },
        [run]
    );

    const logOut = () => {
        googleLogout();
        setProfile(null);
        localStorage.clear();
    };

    const create = () => {
        axios.post('http://localhost:8080/api/v1/auth/createuser',{
            email: emailRef.current.value,
            name: nameRef.current.value
        }).then((result)=>{
            console.log(result.data);
            if(result.data.message==="User Registered Successfully"){
                localStorage.setItem('userid',result.data.userid)
                window.location.href = '/sites/'+result.data.userid
            }else if(result.data.message==="User found"){
                localStorage.setItem('userid',result.data.userid)
                window.location.href = '/sites/'+result.data.userid
            }
        })
    };
    

    return (
        <div className="Signup">
            <Nav />
            <div className='title'>Log in or sign up in <span>seconds!</span></div>
            <div className='subtitle'>Use your email or another service to continue with Toggle (it's free)!</div>

            {profile?.name ? (
                <div className='name'>
                    <input ref={emailRef} type='email' disabled defaultValue={profile.email} />
                    <input ref={nameRef} type='name' placeholder='Your name' defaultValue={profile.name} />
                    <button onClick={create}>Next</button>
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <>
                    <button onClick={() => login()}><img alt="img" src='https://www.edigitalagency.com.au/wp-content/uploads/google-logo-icon-PNG-Transparent-Background-letter-G-multiple-colors.png' />Continue with Google</button>
                    <button onClick={() => window.location.href = '/signup/name'}><img alt="img" src='https://freepnglogo.com/images/all_img/facebook-logo.png' />Continue with Facebook</button>
                </>
            )}


            <div className='privacy'>By continuing, you agree to Toggle's Terms of Use. Read our Privacy Policy.</div>
        </div>
    );
}

export default Signup;
