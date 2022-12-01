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
            <nav class="navbar ">
                    <div id='nav_img'>
                        <a class="navbar-brand" data-target="#navbarNav" href="#" >
                            <Link to='/' className="nav-item nav-link"> <img src="/lfe.png" height="30" alt=""></img></Link>
                        </a>
                    </div>
                    <div class="navbar navbar-inverse " id="navbarNav">
                        {!auth.username &&
                        <a><Link to={profileurl} >
                        <button class="navbar-toggler" type="button" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <img src={auth.image}></img>
                        </button>
                        </Link></a>
                        }
                        {auth.username && 
                            <a><Link to={profileurl} className="nav-item nav-link">
                                <img width="30px" src={auth.image}></img>
                                </Link></a>
                        }
                        {auth.username && 
                            <a><Link to='/' onClick={()=>setAuth({})} className="nav-item nav-link">
                                <img width="30px" src="/logout.png"></img>
                            
                            </Link></a>
                        }

                    {!auth.username &&
                        <a><Link to='/login'>
                        <button class="navbar-toggler" type="button" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <img width="30px" src="/home.png"></img>
                        </button>
                        </Link></a>
                        }
                </div>
            </nav>
    );

}

