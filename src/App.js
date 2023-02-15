import Css from './Css.css';
import { useEffect,useState } from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import Merch from './components/pages/Merch';
import Post from './components/Post';
import Odata from './components/Odata';
import Category from './components/Category';
import Footer from './components/Footer';
import User from './components/User';
import Profile from './components/Profile';
import Login from './components/Login';
import RequireAuth from './components/RequireAuth';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Get_User_IP from './components/Get_User_IP';
import {HelmetProvider} from 'react-helmet-async';

function App(){
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 })
  const isBigScreen = useMediaQuery({ minWidth: 1824 })
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
  const isPortrait = useMediaQuery({ orientation: 'portrait' })
  const isRetina = useMediaQuery({ minResolution: '2dppx' })
  const helmetContext = {};

  let [userid, setUserID] = useState([])
  //const {auth} = useAuth();

  useEffect(()=>{
    Get_User_IP(setUserID,userid);
  },[])



    return (
      <HelmetProvider context={helmetContext}>
        <Router>
        <div className="App">
        
          <header className="Navigation">
            <Nav/>
          </header>
            <div className="AppBody">
              <Routes>
                <Route path="/" element={<Home 
                  
                  userid = {userid.country_name}

                />} />
                <Route path="/about" element={<About/>} />
                <Route path="/merch" element={<Merch/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/odata" element={<Odata/>} />
                <Route path="/post/:id" element={<Post/>} />
                <Route path="/category/:id" element={<Category/>}/>
                <Route path="/user/:id" element={<User/>}/>
                <Route element={<RequireAuth/>}>
                  <Route path="/profile/:id" element={<Profile/>}/>
                </Route>
              </Routes>
            </div>
        
          <footer class="Footer">
            <Footer/>
          </footer>
        </div>
        </Router>
      </HelmetProvider>
    );
}


export default App;
