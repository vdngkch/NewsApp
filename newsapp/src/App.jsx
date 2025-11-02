import './App.css'
import React, { useState} from 'react'
import NavBar from './components/NavBar';
import News from './components/News';


function App(){
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("general");

  const handleCategoryChange = (newCategory) =>{
    setCategory(newCategory);
    setSearchTerm("")
  }
  return(
    <>
     <NavBar onSearch={(term)=>setSearchTerm(term)} onCategoryChange={handleCategoryChange}/>
      <News searchTerm={searchTerm} category={category}/>
    </>
  )
}

export default App;