import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import europeCountries from './europe_countries.json'; // assuming the file is in the same directory

export default function Nav() {

    const { setAuth, auth } = useAuth();
    const [selectedCountry, setSelectedCountry] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate
    let profileurl = "/profile/" + auth.username;
    
    const toggleDropdown = () => setDropdownVisible(!dropdownVisible);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        window.location.href = `/category/${country}`; // This will cause a page refresh
        setDropdownVisible(false); // This might be redundant as the page will refresh
    };
    

    return (
        <nav className="navbar ">
            <div id='nav_img'>
                <Link to='/' className="navbar-brand" data-target="#navbarNav">
                    <img src="../icons/lfe.png" height="30" alt="lfe-icon" />
                </Link>
            </div>
            <div className="navbar navbar-inverse " id="navbarNav">

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
                <div className="navbar-toggler">
                    {!dropdownVisible && <img width="25px" src="../icons/europe.png" alt="Toggle Dropdown" className="dropdown-icon" onClick={toggleDropdown} />
                    }
                    {dropdownVisible && (
                    <select className="country-dropdown" onChange={(e) => handleCountrySelect(e.target.value)} onBlur={() => setDropdownVisible(false)}>
                        <option value="">Select Country</option>
                        {europeCountries.map((country) => (
                            <option key={country.id} value={country.country}>
                                {country.country}
                            </option>
                        ))}
                    </select>
                    )}
                </div>

            </div>

        </nav>
    );
}
