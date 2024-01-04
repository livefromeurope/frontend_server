import React, {useState,useEffect} from 'react'
import getPosts from '../getPosts';
import europe_countries from '../europe_countries.json';

export default function SearchBar({setData,setShow_spotlight,setFetchUrl,fetch_url}){
    const BarStyle = {width:"100%",background:"#F0F0F0", "borderRadius":"20px",border:"none", padding:"0.5rem"};
    
    const TagStyle = {"padding-left":"6px","whiteSpace": "nowrap","padding-right":"6px","color":"#FFFFFF","text-align":"center","border-radius":"10px","margin-left":"5%",margin:"3px",display: "inline-block"}
    const Xstyle = {"background-color":"grey","borderRadius":"15px","margin-left":"3px","paddingLeft":"6px","paddingRight":"6px"}
    const Ystyle = {"backgroundColor":"#004494","fontSize":"14px","borderRadius":"15px","margin-left":"3px","paddingLeft":"6px","paddingRight":"6px"}
    const TextStyle = {"marginLeft":"25%"}


    let fetchurl = process.env.REACT_APP_POSTSERVER_URL
    let limit = 20;
    let now_date = new Date().toISOString()
    let [search_token,setSearchToken] = useState('');
    let [search_value,setSearchValue] = useState('');
    let [show_token,setShowToken] = useState(false);

    const tokens = [
        {"value":"European Union"},
        {"value":"Israel"},
        {"value":"Energy"},
        {"value":"Climate Change"},
        {"value":"Ukraine"},
        {"value":"Green Deal"},
        {"value":"Kosovo"},
    
    ];

    
    useEffect(()=>{
        console.log(fetchurl)
        let searchUrl;

        if(search_token){

            search_token = search_token.replace(" ",";")

            searchUrl = fetchurl + 'posts?category=europe&limit=' + limit + '&search=' + search_token +'&date=' + now_date;
            setFetchUrl(searchUrl);
            getPosts(fetch_url,setData);
        }
        else{
            searchUrl = fetchurl + 'posts?' + 'limit=' + limit+ '&date=' + now_date;

            setFetchUrl(searchUrl);
            getPosts(fetch_url,setData);
        }


        /*
        if(search_token  && search_token.length > 3){
            search_token = search_token.replace(" ",";")

            searchUrl = fetchurl + 'posts?category=europe&limit=' + limit + '&search=' + search_token +'&date=' + now_date;
            setFetchUrl(searchUrl);
            getPosts(fetch_url,setData);
            //console.log('tech');
            //changed if logic
        }else {
            //console.log('nothing2');
            searchUrl = fetchurl + 'posts?' + 'limit=' + limit+ '&date=' + now_date;

            setFetchUrl(searchUrl);
            getPosts(fetch_url,setData);
        }
        */
    },[search_token])
    

    function setSearch(passValue) {
        console.log(passValue)
        setSearchToken(passValue);
        setShow_spotlight(false);
    
        let newFetchUrl = fetchurl + 'posts?category=europe&limit=' + limit + '&search=' + passValue.replace(" ", ";") + '&date=' + now_date;
        setFetchUrl(newFetchUrl);
        getPosts(newFetchUrl, setData); // Call getPosts with the new URL
    }
    

    function setBack() {
        setShow_spotlight(false); 
        let newFetchUrl = fetchurl + 'posts?' + 'limit=' + limit+ '&date=' + now_date;
        setFetchUrl(newFetchUrl);
        console.log(newFetchUrl)
        setShowToken(false);
        getPosts(newFetchUrl, setData); // Call getPosts with the new URL
    }
    

    return (
        <div>
        <form onSubmit={(e) => {e.preventDefault() 
            setSearch(search_value.replace(" ",';'));
            setSearchValue('')
            setShowToken(true);
            }}>
            <input 
            type="text"
            className="form-control"
            style={BarStyle}
            key="search-bar"
            value={search_value}
            //value={()=><div>test</div>}
            placeholder={"search and enter"}
            //onChange={(e) => setSearch(e.target.value)}
            onChange={(e) => {
                    setSearchValue(e.target.value);
                    if(e.target.value < 4){
                        setSearch(search_value)
                    }
                }
            }
        />
        {show_token &&
            <div className='input_tag' style={TagStyle}>
                <div className='row flex-nowrap' >
                    <div style={TextStyle}>{search_token} </div>
                    <div style={Xstyle} type="button" onClick={(e) => {setSearchValue(""); setBack()}}>x</div>
                </div>
            </div>
            
        }
        
        </form>
        {!show_token &&
            <div className='input_tag' style={{...TagStyle, display: "flex", flexWrap: "wrap"}}>
                {tokens && tokens.length > 0 && tokens.map((token) => (
                    <div key={token.value} style={{...Ystyle, marginRight: "10px", marginBottom: "10px"}} type="button" onClick={(e) => {
                        setSearchValue("");
                        setSearch(token.value);
                        setShowToken(true);
                    }}>
                        {token.value}
                    </div>
                ))}
            </div>
        }
    </div>
    );
    }

