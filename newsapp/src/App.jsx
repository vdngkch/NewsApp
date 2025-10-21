import './App.css'
import React, {Component, useState} from 'react'
import NavBar from './components/navbar';
import News from './components/News';
import { BrowserRouter,Routes, Route,Link}  from 'react-router-dom';


function App(){
  const [searchTerm, setSearchTerm] = useState("");
  return(
    <>
     <NavBar onSearch={(term)=>setSearchTerm(term)}/>
        <News searchTerm={searchTerm}/>
    </>
  )
}

export default App;