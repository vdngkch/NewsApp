import React, {useState} from "react";


export const SearchBar=({onSearch})=>{
    const [input, setInput] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();//prevent page reload
        onSearch(input);
    };

    return(
     <form className="d-flex" onSubmit={handleSubmit}>
        <input
        className="form-control me-2"
        type="search"
        placeholder="Search news..."
        value={input}
        onChange={(e)=>setInput(e.target.value)}/>
        <button className="btn btn-outline-success">Search</button>
     </form>
    );
}
export default SearchBar;