import React from 'react';
import Posts from './Posts';
import { useState, useEffect  } from 'react';
import useAuth from './useAuth';


export default function Profile(){
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
                    <form class="form" id="profile_form" onSubmit={()=>{}}>
                        <div>Profile: @{auth.username}</div>
                        <label class='lables' htmlFor="image">Your Image:</label>
                        <div class='profile_img'><img width="250px" class='profile_img'src={auth.image}></img></div>
                        <label class='lables' htmlFor="username">Your Username:</label>
                        <input
                            class="form-control"
                            type="text"
                            id="username"
                            
                            autoComplete="off"
                            //onChange={(e) => setEmail(e.target.value)}
                            value={auth.username}
                            required
                            />
                        <label class='lables' htmlFor="email">Your Email:</label>
                        <input
                            class="form-control"
                            type="email"
                            id="email"
                            //onChange={(e) => setPwd(e.target.value)}
                            value={auth.email}
                            required
                            />
                        <label class='lables' htmlFor="image">Your Image URL:</label>
                        <input
                            class="form-control"
                            type="text"
                            id="image"
                            //onChange={(e) => setPwd(e.target.value)}
                            value={auth.image}
                            required
                            />
                        
                        
                    </form>
                    <div>@{auth.username} posts:</div>
                </div>
                <div><Posts query_params={data} /></div>
            </div>
        </section>
    );
}


