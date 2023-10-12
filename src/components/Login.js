import {useRef,useState,useEffect} from 'react';
import useAuth from './useAuth'
import {Link,useNavigate, useLocation} from 'react-router-dom';


    //https://www.youtube.com/watch?v=oUZjO00NkhY&t=1208s
    //https://www.youtube.com/watch?v=X3qyxo_UTR4


function Login(){
    const {setAuth,auth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [image, setImage] = useState('');
    const [bio, setBio] = useState('');
    const [repwd, ResetPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [signup, setSignUp] = useState(true);

    useEffect(()=>{
        userRef.current.focus();
    }, [])

    useEffect(()=>{
        setErrMsg('');
    }, [email,pwd])


    const handleLogin = async (e) => {
        e.preventDefault();

        try{

            let authurl = process.env.REACT_APP_AUTHSERVER_URL + 'user/login'
            let body_json = 
            {
                'email': email,
                'password': pwd,
            }
            
            await fetch(authurl, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body_json)
            })  .then(response => response.json())
                .then(data => {
            //console.log(data)
            const status = parseInt(data.status);
            const accessToken = data.token;
            const username = data.username;
            const email = data.email;
            const image = data.image;
            const bio = data.bio;

            if(status === 200){
                setEmail('');
                setPwd(''); 
                setAuth({accessToken,username,email,image,bio});
                //console.log('success')
                navigate(from, {replace: true})
                //console.log(auth)

            }else{
                //console.log('no success')
                setEmail('');
                setPwd(''); 
            }
                });

        }catch(err){
            if(!err?.response){
                setErrMsg('No server Response')
            }else if (err.response?.status === 400){
                setErrMsg('Missing Username or Password');
            }else if (err.response?.status === 401){
                setErrMsg('Unauthorized')
            }else{
                setErrMsg('Login Failed')
            }
            errRef.current.focus();
        }

    }

    const handleSignUp = async (e) => {
        e.preventDefault();

        try{

            if(pwd === repwd){
                let registerurl = process.env.REACT_APP_AUTHSERVER_URL + 'user/register'
                let created_date = new Date().toISOString()
                let body_json = 
                {
                    'user': user,
                    'email': email,
                    'password': pwd,
                    'image': image,
                    'bio':bio,
                    'created_date':created_date,
                }
                await fetch(registerurl, 
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify(body_json)
                })  .then(response => response.json())
                    .then(data => {
                //console.log(data)
                const status = parseInt(data.status);
                //console.log(status)

                if(status === 200){
                    console.log('success')
                    setEmail('');
                    setPwd(''); 
                    ResetPwd('');
                    setUser('');
                    setImage('');
                    setBio('');
                    alert('You are now registered at LiveFromEurope')
                    setSignUp(true);
                }else{
                    console.log('no success')
                    setPwd('');
                    
                    ResetPwd('');
                }
                    });
            }

        }catch(err){
            if(!err?.response){
                setErrMsg('No server Response')
            }else if (err.response?.status === 400){
                setErrMsg('Missing Username or Password');
            }else if (err.response?.status === 401){
                setErrMsg('Unauthorized')
            }else{
                setErrMsg('Login Failed')
            }
            errRef.current.focus();
        }

    }



    return(
        <>
        <div className= "container">
        {signup ? (

            <section >
                <div>
                        <img width="200px" src="./icons/lfe.png"></img>
                    </div>
                <div className="jumbotron">
                    
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                    
                    <form className="form" id="login_form" onSubmit={handleLogin}>
                        <div>Sign In</div>
                        <label className='lables' htmlFor="email">Email:</label>
                        <input
                            className="form-control"
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder={'Enter username'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            textContentType={'username'}
                            required
                            />
                        <label className='lables' htmlFor="password">Password:</label>
                        <input
                            className="form-control"
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            minLength="10"
                            placeholder={'Enter password'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            securetextentry={true}
                            textcontenttype={'password'}
                            required
                            />
                        <button className="btn btn-md btn-outline btn-primary">Sign In</button>
                    </form>
                    <p>
                        <label className='lables' >Need an Account?</label>
                        <button className="btn btn-md btn-outline btn-primary" onClick={()=>setSignUp(false)} >Sign Up</button>
                    </p>
                </div>
            </section>
    ):(
        <section >
            <div>
                        <img width="200px" src="./icons/lfe.png"></img>
                    </div>
            <div className="jumbotron">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            
            <form className="form" id="login_form" onSubmit={handleSignUp}>
                <div>Sign Up</div>
                <label className='lables' htmlFor="username">Enter Username:</label>
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
                <label className='lables' htmlFor="bio">Enter Bio:</label>
                    <input
                            className="form-control"
                            type="text"
                            id="bio"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setBio(e.target.value)}
                            value={bio}
                            required
                            />
                    <label className='lables' htmlFor="image">Enter Image URL:</label>
                    <input
                            className="form-control"
                            type="text"
                            id="url"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setImage(e.target.value)}
                            value={image}
                            required
                            />
                    <label className='lables' htmlFor="password">Enter Password:</label>
                    <input
                            className="form-control"
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            minlength="10"
                            required
                    />
                    <label className='lables' htmlFor="password">ReEnter Password:</label>
                    <input
                            className="form-control"
                            type="password"
                            id="password-reenter"
                            onChange={(e) => ResetPwd(e.target.value)}
                            value={repwd}
                            minlength="10"
                            required
                    />
                    <button className="btn btn-md btn-outline btn-primary">Sign Up</button>
            </form>
            </div>
        </section> 
    )}
    </div>
    </>
    
    )
}

export default Login;
