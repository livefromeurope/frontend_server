import React from 'react';
import Posts from './Posts';
import { useState, useEffect  } from 'react';
import useAuth from './useAuth';


export default function User(){
    const [data, setData] = useState('');
    let {auth} = useAuth();
    const url = window.location.href;
    const user = url.split('/').pop();
    var query_params = () => {
        setData(process.env.REACT_APP_POSTSERVER_URL + 'posts?author=' + user);
    }
    useEffect(()=>{
        query_params()
    },[])
    return(
        
        <section>
            <div class= "container">
                <div>
                    <div>
                        {auth.username}
                    </div>
                    <div>
                        <img src={auth.image} ></img>
                    </div>
                </div>
                <div><Posts query_params={data} /></div>
            </div>
        </section>
    );
}


