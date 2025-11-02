import React, {Component} from 'react'
import SearchBar from './search'


export class NavBar extends Component{
     handleHomeClick =()=>{
       window.location.reload();
    }

    render(){
        return(
            <div>
                 <nav className="navbar navbar-expand-lg navbar-light bg-light">
                   <div className="container-fluid">
                    <a className="navbar-brand" href="#">NewsZilla</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                        data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className='nav-item'>
                                <button className='nav-link btn btn-link'
                                onClick={this.handleHomeClick}
                                style={{cursor: 'pointer'}}>
                                    Home
                                </button>
                            </li>

                            <li>
                                <a className="nav-link" href="#" onClick={()=> console.log(this.props.onCategoryChange('business'))}>Business</a>
                            </li>
                            <li>
                                <a className="nav-link" href="#" onClick={()=> console.log(this.props.onCategoryChange('sports'))}>Sports</a>
                            </li>
                            <li>
                                <a className="nav-link" href="#" onClick={()=> console.log(this.props.onCategoryChange('entertainment'))}>Entertainment</a>
                            </li>
                            <li>
                                <a className="nav-link" href="#" onClick={()=> console.log(this.props.onCategoryChange('games'))}>Games</a>
                            </li>
                            <li>
                                <a className="nav-link" href="#" onClick={()=> console.log(this.props.onCategoryChange('health'))}>Health</a>
                            </li>
                            <li>
                                <a className="nav-link" href="#" onClick={()=> console.log(this.props.onCategoryChange('science'))}>Science</a>
                            </li>
                            <li>
                                <a className="nav-link" href="#" onClick={()=> console.log(this.props.onCategoryChange('technology'))}>Technology</a>
                            </li>
                        </ul>
                        
                        <SearchBar onSearch={this.props.onSearch}/>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar 