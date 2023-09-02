import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"


const Fencers = () => {
    const [fencers,setFencers] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        const fetchAllFencers = async ()=>{
            try{
                const res = await axios.get("http://192.168.56.11:8080/fencers")
                setFencers(res.data);
            }catch(err){
                console.log(err)
            }
        }
        fetchAllFencers()
    },[])

    const handleDelete = async (id)=>{
        try {
            await axios.delete("http://192.168.56.11:8080/fencers/"+id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    const clickAddFencer = async e =>{
        e.preventDefault()
        try {
            navigate("/add")
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Fencers</h1>
            <hr />
            <div className="fencers" >
                {fencers.map( (fencer)=>(
                    <div className="fencer" key={fencer.id}>
                        <h4>{fencer.score}</h4>
                        <h2>{fencer.name}</h2> 
                        <p>{fencer.club}</p>      
                        <p>{fencer.weapon}</p>   
                        <button className="delete" onClick={()=>handleDelete(fencer.id)}>Delete</button>
                        <button className="update"><Link to={`/update/${fencer.id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <button className="formButton AddFencer"  onClick={clickAddFencer}>Add Fencer</button>
        </div>
    )
}

export default Fencers