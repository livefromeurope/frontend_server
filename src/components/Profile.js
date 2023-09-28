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
            <div className= "container">
                <div>
                    <form className="form" id="profile_form" onSubmit={()=>{}}>
                        <div>Profile: @{auth.username}</div>
                        <label className='lables' htmlFor="image">Your Image:</label>
                        <div className='profile_img'><img width="250px" className='profile_img'src={auth.image}></img></div>
                        <label className='lables' htmlFor="username">Your Username:</label>
                        <input
                            className="form-control"
                            type="text"
                            id="username"
                            
                            autoComplete="off"
                            //onChange={(e) => setEmail(e.target.value)}
                            value={auth.username}
                            required
                            />
                        <label className='lables' htmlFor="bio">Your Bio:</label>
                        <textarea
                            className="form-control"
                            type="text"
                            id="bio"
                            rows="3"
                            
                            autoComplete="off"
                            //onChange={(e) => setEmail(e.target.value)}
                            value={auth.bio}

                            />
                        <label className='lables' htmlFor="email">Your Email:</label>
                        <input
                            className="form-control"
                            type="email"
                            id="email"
                            //onChange={(e) => setPwd(e.target.value)}
                            value={auth.email}
                            required
                            />
                        <label className='lables' htmlFor="image">Your Image URL:</label>
                        <input
                            className="form-control"
                            type="text"
                            id="image"
                            //onChange={(e) => setPwd(e.target.value)}
                            value={auth.image}
                            required
                            />
                        
                        <div className="post-actions-right">
                            <button type='button' id='small-button' className="btn btn-primary btn-sm"> 
                                EDIT
                        </button>
                        </div>
                    
                        
                    </form>
                    <div>@{auth.username} posts:</div>
                </div>
                <div><Posts query_params={data} /></div>
            </div>
        </section>
    );
}


