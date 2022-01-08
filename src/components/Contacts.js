import React, { useState } from "react"
import axios from 'axios'

function Contacts(props){
const [contacts,setContacts] = useState('')
const [contacId,setContactId] = useState('')

const handleClick = async() => {
    const api = `http://localhost:4000/api/contacts`
    const data = await axios.get(api, { headers: {"Authorization" : `Bearer ${props.token}`} })
    setContacts(data)
}
const handleDelete = async(id) => {
    axios.delete(`http://localhost:4000/api/contacts/${id}`, 
        { headers: {"Authorization" : `Bearer ${props.token}`} })
    const data = await axios.get(`http://localhost:4000/api/contacts/`, 
        { headers: {"Authorization" : `Bearer ${props.token}`} })
    setContacts(data)
}
const handleCreate = async() => {
    axios.post(`http://localhost:4000/api/contacts`, 
        {"status":"govno"},
        { headers: {"Authorization" : `Bearer ${props.token}`}, })
    const data = await axios.get(`http://localhost:4000/api/contacts/`, 
        { headers: {"Authorization" : `Bearer ${props.token}`} })
    setContacts(data)
}

console.log(contacts)

return (
    <div className="container">
        <h2>Example component</h2>
        <button onClick = {handleClick}>Get contacts</button>
        
        <button onClick = {handleCreate}>create contact</button>
        <div>
            {
                contacts.data?contacts.data.map(el => (
                    <div>
                        <div>
                            {el.status} 
                            {el._id} 
                            <button onClick = {()=>handleDelete(el._id)}>delete contact</button>
                        </div>
                    </div>
                    
                ))
                :null
            }
        </div>
    </div>
);
}
export default Contacts