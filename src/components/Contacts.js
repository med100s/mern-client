import React, { useState } from "react"
import axios from 'axios'

import useInput from "./customHooks/useInput"

function Contacts(props){
    const [contacts, setContacts] = useState('')
    const [status, setStatus] = useInput('')

    const api = `${window.env.SERVER_DOMAIN}/api/contacts`
    const authorizationHeader = {"Authorization" : `Bearer ${props.token}`}

    const getData = async() =>{
        const data = await axios.get(api,{ headers: authorizationHeader })
        setContacts(data)
    }

    window.addEventListener('load', getData());

    const handleDelete = async(id) => {
        axios.delete(api+'/'+id, { headers: authorizationHeader })
        getData()
    }

    function handleCreate (){
        axios.post(api, {"status":status}, { headers: authorizationHeader })
        getData()
    }

    console.log(contacts)

    return (
        <div className="container">
            <h2>Example component</h2>
            <button onClick = {getData}>Get contacts</button>

            {setStatus}
            
            <button onClick = {handleCreate}>create contact</button>
            <div>
                {
                    contacts.data?contacts.data.map(el => (
                        <div>
                            <div>
                                {el.status} id in mongodb: {el._id} 
                                <button onClick = {()=>handleDelete(el._id)}>delete contact</button>
                            </div>
                        </div>
                    )):null
                }
            </div>
        </div>
    );
}
export default Contacts