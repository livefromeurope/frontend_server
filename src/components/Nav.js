import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from './useAuth';

export default function Nav() {
    const { setAuth, auth } = useAuth();
    let profileurl = "/profile/" + auth.username;
    console.log("show",auth)
    return (
        <nav className="navbar ">
            <div id='nav_img'>
                <Link to='/' className="navbar-brand" data-target="#navbarNav">
                    <img src="../icons/lfe.png" height="30" alt="lfe-icon" />
                </Link>
            </div>
            <div className="navbar navbar-inverse " id="navbarNav">
                {auth.username &&
                    <Link to={profileurl}>
                        <button className="navbar-toggler" type="button" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <img src={auth.image} alt="user-icon" />
                        </button>
                    </Link>
                }
                {auth.username &&
                    <Link to={profileurl} className="nav-item nav-link">
                        <img width="30px" className="profile_img" src={auth.image} alt="user-icon" />
                    </Link>
                }
                {auth.username &&
                    <Link to='/' onClick={() => setAuth({})} className="nav-item nav-link">
                        <img width="25px" src="../icons/logout.png" alt="logout-icon" />
                    </Link>
                }
                {!auth.username && 
                    <Link to='/login' className="navbar-toggler" type="button" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <img width="20px" src="../icons/home.png" alt="home-icon" />
                    </Link>
                }
                {!auth.username &&
                    <Link to='/about' className="navbar-toggler" type="button" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <img width="20px" src="../icons/gear.png" alt="gear-icon" />
                    </Link>
                }
                {!auth.username &&
                    <Link to='/merch' className="navbar-toggler" type="button" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <img width="25px" src="../icons/shirt.png" alt="shirt-icon" />
                    </Link>
                }
            </div>
        </nav>
    );
}
