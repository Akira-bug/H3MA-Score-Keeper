import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
    const [fencer, setFencer] = useState({
        score:"",
        name:"",
        club:"",
        weapon:"",
    });

    const navigate = useNavigate()

    const handleChange = (e) =>{
        setFencer(prev=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e =>{
        e.preventDefault()
        try {
            await axios.post("http://52.203.255.115:8080/fencers", fencer)
            navigate("/")
        } catch(err) {
            console.log(err)
        }
    }

    const clickHome = async e =>{
        e.preventDefault()
        try {
            navigate("/")
        } catch(err) {
            console.log(err)
        }
    }

    return(
        <div className="form">
            <h1>Add A New Fencer And Weapon</h1>
            <input type="text" placeholder="name" onChange={handleChange} name="name"/>
            <input type="text" placeholder="club" onChange={handleChange} name="club"/>
            <input type="text" placeholder="weapon" onChange={handleChange} name="weapon"/>
            
            <button className="formButton" onClick={handleClick}>Add</button>
            <button className="cancelButton" onClick={clickHome}>Cancel</button>

        </div>
    );
};

export default Add