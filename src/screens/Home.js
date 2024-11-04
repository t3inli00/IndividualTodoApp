import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Row from '../components/Row.js';
import { useUser } from '../context/useUser.js';
import './Home.css';

const url ='http://localhost:3001'


function Home() {
  const { user } = useUser()
  const [task,setTask] =useState('');
  const [tasks,setTasks] =useState([])

  useEffect(() => {
    axios.get(url)
    .then(response => {
      setTasks(response.data)
    }).catch(error =>{
      alert(error.response.data.error ? error.response.data.error :error)
    })
  },[])
  

  const addTask = () => {
    const headers = {headers: { authorization: user.token} }
    axios.post(url +'/create', {
      description: task
    },headers)
    .then(response =>{
      setTasks([...tasks,{id:response.data.id,description:task}])
      setTask('')
    }).catch(error => {
      alert(error.response.data.error ? error.response.data.error :error)
    })    
  };
  const deleteTask =(id) =>{
    // eslint-disable-next-line
    const headers ={headers : {authorization:user.token}}
    axios.delete( `${url}/delete/${id}`, headers)
    .then(response => {
      const withoutRemoved =tasks.filter(i => (i.id !== id))
      setTasks(withoutRemoved)
    }).catch(error =>{
      console.log(error);
      
      alert(error.response.data.error ? error.response.data.error :error)
    })
    
  }
  return (
    <div id="container">
      <h3>Todo</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <input placeholder='Add new task'
        value={task}
        onChange={e=>setTask(e.target.value)}     
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault(); // Prevents the form from submitting
            addTask();
          }
        }}   
        />
      </form>
      <ul>
          {
            tasks.map(t => (
            <Row key={t.id} item ={t} deleteTask={deleteTask} />
          ))
          }
      </ul>
    </div>
  );
}

export default Home;
