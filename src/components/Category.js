import React from 'react';
import Posts from './Posts';
import { useState, useEffect  } from 'react';


export default function Category(){
    const [data, setData] = useState('');
    const url = window.location.href;
    const category = url.split('/').pop();
    var query_params = () => {
        setData(process.env.REACT_APP_POSTSERVER_URL + 'posts?category=' + category);
    }
    useEffect(()=>{
        query_params()
    },[])
    return(
        
        <section>
            <div className= "container">
                <div><Posts query_params={data} /></div>
            </div>
        </section>
    );
}

//export default Category;