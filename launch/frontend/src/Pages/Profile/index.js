import { useEffect, useRef, useState } from 'react';
import './index.css';
import Nav from './Nav';
import { useParams } from "react-router-dom";
import axios from 'axios';




function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [changes, setChanges] = useState(1);
    const nameRef = useRef(null);



    useEffect(
        () => {
                axios.post('http://localhost:8080/api/v1/auth/fetchuser', {
                    _id: id
                }).then((result) => {
                    console.log(result.data);
                    if (result.data.message === "found") {
                        setUser(result.data.user);
                    } 
                })
        },
        [id, changes]
    );  

    const logOut = () => {
        localStorage.clear();
    };

    const save = () => {
        axios.post('http://localhost:8080/api/v1/auth/updateuser', {
            _id: id,
            name: nameRef.current.value
        }).then((result) => {
            if (result.data.message === "Updated") {
                setChanges(changes + 1);
            }
        })
    }
    return (
        <div className="Profile">
            <Nav />
            <div className='title'>Personal Information</div>

            <div className='name'>
                    <input type='email' disabled defaultValue={user.email}/>
                    <input ref={nameRef} type='name' placeholder='Your name' defaultValue={user.name}/>
                    <button onClick={save}>Save</button>
                    <button onClick={logOut}>Log out</button>
                </div>


        </div>
    );
}

export default Profile;
