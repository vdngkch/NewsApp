import React,{Component} from 'react'
import loading from './loading2.gif'

export class loader extends Component{
    render(){
        return(
            <div>
               <img src={loading} alt="loading" height={'100px'} width={'100px'}/>
            </div>
        )
    }
}

export default loader