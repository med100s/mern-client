import React, { useState } from "react"
import axios from 'axios'

function Contacts(props){
const [contacts,setContacts] = useState('')
const [name,setName] = useState('')

const handleClick = async() => {
    const api = `http://localhost:4000/api/contacts`
    const data = await axios.get(api, { headers: {"Authorization" : `Bearer ${props.token}`} })
    setContacts(data)
}

console.log(contacts)

return (
    <div className="container">
        <h2>Example component</h2>
        <button onClick = {handleClick}>Get contacts</button>
        <div>
            {
                contacts.data?contacts.data.map(el=> (
                    <div>
                        {el.status}
                    </div>
                ))
                :null
            }
        </div>
    </div>
);
}
export default Contacts