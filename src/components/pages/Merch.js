import React from 'react';
import {useState,userRef} from 'react';
import { useHorizontalScroll} from '../functions/useHorizontalScroll';
import MerchDropdown from '../functions/merch_dropdown';



function Merch(){

    const scrollRef = useHorizontalScroll();
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [shirt,setShirt] = useState('../merch/green_deal_shirt.jpg')
    const merch = [
        
        {"merch_url":"../merch/DSC00777.JPG"},
        {"merch_url":"../merch/green_deal.jpg"},
        {"merch_url":"../merch/DSC00881.JPG"},
        {"merch_url":"../merch/DSC00877.JPG"},
        {"merch_url":"../merch/DSC00883.JPG"},
        {"merch_url":"../merch/DSC00889.JPG"}
    
    ];


    function SubmitIT(){

        if(user && email && street && city ) {
        
            /*
            console.log(user)
            console.log(email)
            console.log(street)
            console.log(city)
            console.log(shirt)
            */
            


            setEmail('');
            setUser('');
            setEmail('');
            setStreet('');
            setCity('');
            alert('you ordered a livefromeurope shirt. thank you very much for your support - we will contact you.')
            
        }else{

            alert('there is some information missing. please complete the form.')
        
        }
    }

    function Mailto({ email, subject, body}) {


        body = 'User: '+user+' '+ 'Email: '+email+' '+ 'Shirt: '+shirt+' '+ 'Street: '+street+' '+ ' City: '+street
        subject = 'livefromeurope.com - shirt order: ' + user

        return (
            <a href={`mailto:livefromeurope@outlook.com?subject=${subject || ""}&body=${body || ""}`}>
                <button onClick={()=>{}} type='button' class="btn btn-md btn-outline btn-primary">
                    Order
                </button>
            </a>
        );

    }
    
    return(
        <section>

            <div class= "container" style={{ "max-height":"100%"}}>

                <div className="Merch"  ref={scrollRef} style={{ overflow: "auto" }}>

                <div >
                scroll right to order &nbsp;
                    <img height="50px"src="../merch/white_arrow.png"></img>
                </div>
                
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

                <div>
                    <p>  &nbsp;&nbsp;&nbsp;   </p>
                </div>
                <div class='Merch_container'>
                
                <form class="merch_form" id="login_form">

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
                    {/*
                    <Mailto email="livefromeurope@outlook.com" subject="Hello" body="Hello world!">
                    </Mailto> 
                    */} 
                    <button onClick={()=>(SubmitIT())} type='button' class="btn btn-md btn-outline btn-primary">Order</button>
                    
            </form>
                </div>
                </div>
                </div>
                <div>
                    <p>  &nbsp;&nbsp;&nbsp;   </p>
            </div>
            </div>

        </section>
    );
}

export default Merch;