import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Project() {
    
    const [projects, setProjects] = useState(null);
    const [users, setUsers] = useState(null);
    const [showCreate, setShowCreate] = useState(false);
    const [npNo, setNpNo] = useState('');
    const [npClient, setNpClient] = useState('');
    const [npAddress, setNpAddress] = useState('');
    const [npContact, setNpContact] = useState('');
    const [npType, setNpType] = useState('');
    const [npDue, setNpDue] = useState('');
    const [npAssign, setNpAssign] = useState('');
    const [npNumber, setNpNumber] = useState(0);
    useEffect(() => {
        axios.get("/projects").then((res) => setProjects(res.data));
    }, [npNumber])
    useEffect(() => {
        axios.get("/users").then((res) => setUsers(res.data));
    }, [])
    const handleCreate = () => {
        setShowCreate(true);
    }
    const handleSubmitNew = async () => {
        await axios.post('/createproject', {
            project: {
                No: npNo,
                Client: npClient,
                Address: npAddress,
                Contact: npContact,
                Type: npType,
                Due: npDue,
                Assign: npAssign
            }
        }).then((res) => {
            if (res.data){
                console.log(res.data);
                setShowCreate(false);
                setNpNumber(npNumber => npNumber + 1);
            }
        });
    }
    return (
        <>
        <div>
            <button onClick={handleCreate}>create new project</button>
        </div>
        {showCreate ? <div className="new-project">
            <div>
                <div>Project No.</div>
                <input type="text" onChange={(e)=>{setNpNo(e.target.value)}} value={npNo}/>
            </div>
            <div>
                <div>Client</div>
                <input type="text" onChange={(e)=>{setNpClient(e.target.value)}} value={npClient}/>
            </div>
            <div>
                <div>Address</div>
                <input type="text" onChange={(e)=>{setNpAddress(e.target.value)}} value={npAddress}/>
            </div>
            <div>
                <div>Contact</div>
                <input type="text" onChange={(e)=>{setNpContact(e.target.value)}} value={npContact}/>
            </div>
            <div>
                <div>Type</div>
                <select onChange={(e)=>{setNpType(e.target.value)}} value={npType}>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                </select>
            </div>
            <div>
                <div>Due Date</div>
                <input type="date" onChange={(e)=>{setNpDue(e.target.value)}} value={npDue}/>
            </div>
            <div>
                <div>Assign To</div>
                <select onChange={(e)=>{setNpAssign(e.target.value)}} value={npAssign}>
                    <option value="Unassigned">Unassigned</option>
                    {users ? users.map(user => <option key={user.name}>{user.name}</option>) : null}
                </select>
            </div>
            <button onClick={handleSubmitNew}>Create</button>
            <button onClick={()=>{setShowCreate(false)}}>Cancel</button>
        </div> : null}
        <div>
           {projects ? projects.map((p) => {
               return (<div key={p['No']} className="project">
                   <div>{p['No']}</div>
                   <div>{p['Client']}</div>
                   <div>{p['Address']}</div>
                   <div>{p['Contact']}</div>
                   <div>{p['Type']}</div>
                   <div>{p['Due']}</div>
                   <div>{p['Assign']}</div>
                   </div>)
           }) : 'Loading' } 
        </div>
        
        </>
    )
}

export default Project
