//import MerchDropdown from '../functions/merch_dropdown';


export default function MerchForm(){

    return(
        <section>
            <div className= "container">
            <div className='Merch_container'>
                
                <form className="merch_form" id="login_form">
                {/*
                <MerchDropdown

                    setShirt={setShirt}
                />
                */}
                

                    <label className='lables' htmlFor="username">Enter Name:</label>
                    <input
                            className="form-control"
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            />

                    <label className='lables' htmlFor="email">Enter Email:</label>
                    <input
                            className="form-control"
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            />
                    <label className='lables' htmlFor="email">Enter Street:</label>
                    <input
                            className="form-control"
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setStreet(e.target.value)}
                            value={street}
                            required
                            />

                    <label className='lables' htmlFor="email">Enter City:</label>
                    <input
                            className="form-control"
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
                    <button onClick={()=>(SubmitIT())} type='button' className="btn btn-md btn-outline btn-primary">Order</button>
                    
            </form>
                </div>
            </div>
        </section>
    );
}

