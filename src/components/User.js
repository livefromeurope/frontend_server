import React from 'react';
import Posts from './Posts';
import { useState, useEffect  } from 'react';
import useAuth from './useAuth';
import Get_UserData from './functions/Get_UserData';


export default function User(){
    const [data, setData] = useState('');
    const [userdata, setUserdata] = useState([]);
    let {auth} = useAuth();
    const url = window.location.href;
    const user = url.split('/').pop();


    var query_params = () => {
        setData(process.env.REACT_APP_POSTSERVER_URL + 'posts?author=' + user);
        let passurl = process.env.REACT_APP_AUTHSERVER_URL + 'user/data?username=' + user
        Get_UserData(passurl,setUserdata)
    }

    useEffect(()=>{
        query_params()
        console.log(userdata.username)
    },[])

    return(
        
        <section>
            <div class= "container">
                <div>
                    <div>
                        @{user}
                    </div>

                    {userdata.image && 
                        <div>
                            <img src={userdata.image} class='profile_img' height="300"></img>
                        </div>
                    }
                    {!userdata.image && 
                        <img src="../EU-Flag.jpeg" class='profile_img'height="300"></img>
                    }

                    {userdata.bio && 
                        <div>
                            Bio: {userdata.bio}
                        </div>
                    }

                </div>
                <div><Posts query_params={data} /></div>
            </div>
        </section>
    );
}


