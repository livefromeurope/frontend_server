import React from 'react';
import {useState,userRef} from 'react';
import { useHorizontalScroll} from '../functions/useHorizontalScroll';
import MerchDropdown from '../functions/merch_dropdown';


function Singlepage(){

    const scrollRef = useHorizontalScroll();
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [shirt,setShirt] = useState('')


    const merch = [
        
        {"merch_url":"../merch/DSC00777.JPG"},
        {"merch_url":"../merch/green_deal.jpg"},
        {"merch_url":"../merch/DSC00881.JPG"},
        {"merch_url":"../merch/DSC00877.JPG"},
        {"merch_url":"../merch/DSC00883.JPG"},
        {"merch_url":"../merch/DSC00889.JPG"}];

    return(
        <section>
            <div class= "container">
                <div className="Merch" ref={scrollRef} style={{ overflow: "auto" }}>
                <div style={{ whiteSpace: "nowrap",display: "flex"}}>
                    {
                        merch && merch.length>0 && merch.map((merch_item)=>
                            (
                                <div class="merch_pics">
                                <img src={merch_item.merch_url}></img>
                                </div>
                            )
                        )
                    }
                <div>
            </div>

                <div class='Merch_container'>
                
                <form class="merch_form" id="login_form" onSubmit={(console.log('d'))}>

                <MerchDropdown

                    setShirt={setShirt}
                />


                    <label class='lables' htmlFor="username">Enter Name:</label>
                    <input
                            class="form-control"
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            />

                    <label class='lables' htmlFor="email">Enter Email:</label>
                    <input
                            class="form-control"
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            />
                    <label class='lables' htmlFor="email">Enter Street:</label>
                    <input
                            class="form-control"
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setStreet(e.target.value)}
                            value={street}
                            required
                            />

                    <label class='lables' htmlFor="email">Enter City:</label>
                    <input
                            class="form-control"
                            type="text"
                            id="city"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                            required
                            />

                    <button class="btn btn-md btn-outline btn-primary">Order</button>
                
            </form>
                </div>
                
                    
                </div>
                </div>
            </div>
        </section>
    );
}

export default Singlepage;