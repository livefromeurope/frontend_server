import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import useAuth from './useAuth'





export default function Nav(){
    const {setAuth,auth} = useAuth();
    let profileurl = "/profile/" + auth.username;

    /*
    //https://www.codeply.com/go/vMtIjdHK2S/bootstrap-4-navbar-collapse-on-scroll
    const [navBackground, setNavBackground] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => console.log('now');
    }, []);
    
    function handleScroll() {
        console.log("fetchingsss")
    }
    */

    return(
        <div>
            <nav class="navbar navbar-expand-sm ">
                
                <div id='nav_img'>

                    <a class="navbar-brand" data-toggle="collapse" data-target="#navbarNav" href="#" >
                        <Link to='/' className="nav-item nav-link"> <img src="/lfe.png" height="30" alt=""></img></Link>
                    </a>
                </div>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class = "navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNav">

                    <div class="navbar-nav ml-auto">
                    <ul class="navbar-nav" data-toggle="collapse" data-target="#navbarNav">
                        <a><Link to='/' className="nav-item nav-link active">Home</Link></a>
                        <a><Link to='/about' className="nav-item nav-link">About</Link></a>
                        {!auth.username &&
                            <a><Link to='/login' className="nav-item nav-link">Login</Link></a>
                        }
                        {auth.username && 
                            <a><Link to={profileurl} className="nav-item nav-link">@{auth.username}</Link></a>
                        }
                        {auth.username && 
                            <a><Link to='/' onClick={()=>setAuth({})} className="nav-item nav-link">Logout</Link></a>
                        }
                    </ul>
                    </div>

                </div>
            </nav>
        </div>
    );

}

