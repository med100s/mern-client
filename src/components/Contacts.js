import React, { useState } from "react"
import axios from 'axios'

function Contacts(props){
const [students,setStudents] = useState('')
const [name,setName] = useState('')

const handleClick = async() => {
    const api = `http://localhost:4000/api/contacts`
    const data = await axios.get(api, { headers: {"Authorization" : `Bearer ${props.token}`} })
    setStudents(data)
}

console.log(students)

return (
    <div className="container">
        <h2>Example component</h2>
        <button onClick = {handleClick}>Get students</button>
        <div>
            {JSON.stringify(students.data)}
        </div>
    </div>
);
}
export default Contacts