import React from 'react';
import './index.css'
function Loading(props) {
    return(
        <div  className='loading'>
            <div className="spinner-grow text-primary" role="status"/>
            <span color={'primary'} >Carregando...</span>
        </div>  
    );
}
export default Loading;