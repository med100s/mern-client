import React, { useState } from "react"
import axios from 'axios'

function Contacts(props){
const [contacts, setContacts] = useState('')
const [status, setStatus] = useInput('')

const handleGetData = async() => {
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

// let handleChange = function(e) {
//     console.log(e.target.value);
//     this.setState({message: e.target.value}, this.handleSubmit);
// }

function handleCreate (){
    axios.post(`http://localhost:4000/api/contacts`, 
        {"status":status},
        { headers: {"Authorization" : `Bearer ${props.token}`}, })
    const data = axios.get(`http://localhost:4000/api/contacts/`, 
        { headers: {"Authorization" : `Bearer ${props.token}`} })
    setContacts(data)
}
function useInput({ type /*...*/ }) {
    const [value, setValue] = useState("");
    const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
    return [value, input];
  }

console.log(contacts)

return (
    <div className="container">
        <h2>Example component</h2>
        <button onClick = {handleGetData}>Get contacts</button>

        {setStatus} {status}
        
        <button onClick = {handleCreate}>Get contacts</button>
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
                )):null
            }
        </div>
    </div>
);
}
export default Contacts