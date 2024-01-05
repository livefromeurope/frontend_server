import React from 'react';
import {useState,userRef} from 'react';
import { useHorizontalScroll} from '../functions/useHorizontalScroll';
import MerchDropdown from '../functions/merch_dropdown';
import MerchForm from './MerchForm';


function Merch(){

    const scrollRef = useHorizontalScroll();
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');  // Add state for country
    const [shirt,setShirt] = useState('../merch/lazadas.jpg')
    const merch = [
        
       
        {"merch_url":"../merch/lfe5.jpg"},
        {"merch_url":"../merch/green_deal.jpg"},
        {"merch_url":"../merch/lfe2.jpg"},
        {"merch_url":"../merch/DSC00881.JPG"},
        {"merch_url":"../merch/DSC00883.JPG"},
        {"merch_url":"../merch/lfe6.jpg"},
        {"merch_url":"../merch/lfe4.jpg"},
    
    ];


    function createMailtoLink() {
        const subject = encodeURIComponent(`livefromeurope.com - shirt order: ${user}`);
        const body = encodeURIComponent(`Livefromeurope Order:\nUser: ${user}\nEmail: ${email}\nShirt: ${shirt}\nStreet: ${street}\nCity: ${city}\nCountry: ${country}`); // Include country in the body
        return `mailto:livefromeurope@outlook.com?subject=${subject}&body=${body}`;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (user && email && street && city && country) { // Check if country is filled in
            window.location.href = createMailtoLink();
        } else {
            alert('There is some information missing. Please complete the form.');
        }
    }
    
    return(
        <section>

            <div className= "container" style={{ "maxHeight":"100%"}}>

                <div className="Merch"  ref={scrollRef} style={{ overflow: "auto" }}>

                <div >
                scroll right to order &nbsp;
                    <img height="50px"src="../merch/white_arrow.png"></img>
                </div>
                
                <div style={{ whiteSpace: "nowrap",display: "flex"}}>
                
                    {
                        
                        merch && merch.length>0 && merch.map((merch_item)=>
                            (

                                <div className="merch_pics" key={merch_item.merch_url} id={merch_item.merch_url}>
                                    
                                <img src={merch_item.merch_url}></img>
                                </div>
                            )
                        )
                    }
                <div>
            </div>

                <div>
                    <p>  &nbsp;&nbsp;&nbsp;   </p>
                </div>

                <div className='Merch_container'>
                    <form className="merch_form" id="login_form" onSubmit={handleSubmit}>
                        

                        <div className="form-grid">
                            {/* Column 1 */}
                            <div className="form-drop">
                                <  MerchDropdown setShirt={setShirt} />
                            </div>
                            
                            {/* Column 2 */}
                            <div>
                                <label className='labels' htmlFor="username">Name:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="username"
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                />
                                <label className='labels' htmlFor="email">Email:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="email"
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                />

                                <label className='labels' htmlFor="street">Street:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="street"
                                    autoComplete="off"
                                    onChange={(e) => setStreet(e.target.value)}
                                    value={street}
                                    required
                                />

                                <label className='labels' htmlFor="city">City:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="city"
                                    autoComplete="off"
                                    onChange={(e) => setCity(e.target.value)}
                                    value={city}
                                    required
                                />

                                <label className='labels' htmlFor="country">Country:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="country"
                                    autoComplete="off"
                                    onChange={(e) => setCountry(e.target.value)}
                                    value={country}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-md btn-outline btn-primary">Order</button>
                    </form>
                </div>

            </div>
            </div>

            </div>

        </section>
    );
}

export default Merch;