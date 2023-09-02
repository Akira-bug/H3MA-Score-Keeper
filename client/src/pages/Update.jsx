import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Update = () => {
    const [fencer, setFencer] = useState({
        name:"",
        club:"",
        weapon:"",

    });

    const navigate = useNavigate()
    const location = useLocation()

    const fencerId = location.pathname.split("/")[2]

    const handleChange = (e) =>{
        setFencer(prev=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e =>{
        e.preventDefault()
        try {
            await axios.put("http://192.168.56.11:8080/fencers/" + fencerId, fencer)
            navigate("/")
        } catch(err) {
            console.log(err)
        }
    }

    return(
        <div className="form">
            <h1>Update Existing Fencer</h1>
            <input type="number" placeholder="score" onChange={handleChange} name="score"/>
            <input type="text" placeholder="name" onChange={handleChange} name="name"/>
            <input type="text" placeholder="club" onChange={handleChange} name="club"/>
            <input type="text" placeholder="weapon" onChange={handleChange} name="weapon"/>
            
            <button className="formButton" onClick={handleClick}>Update</button>

        </div>
    );
};

export default Update