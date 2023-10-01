import React, {useState,useEffect} from 'react'
import getPosts from '../getPosts';
import europe_countries from '../europe_countries.json';

export default function SearchBar({setData,setShow_spotlight,setFetchUrl,fetch_url}){
    const BarStyle = {width:"100%",background:"#F0F0F0", "borderRadius":"20px",border:"none", padding:"0.5rem"};
    
    const TagStyle = {"padding-left":"6px","padding-right":"6px","color":"#FFFFFF","text-align":"center","border-radius":"10px","margin-left":"5%",margin:"3px",display: "inline-block"}
    const Xstyle = {"background-color":"grey","borderRadius":"15px","margin-left":"3px","padding":"6"}
    const TextStyle = {"marginLeft":"25%"}


    let fetchurl = process.env.REACT_APP_POSTSERVER_URL
    let limit = 20;
    let now_date = new Date().toISOString()
    let [search_token,setSearchToken] = useState('');
    let [search_value,setSearchValue] = useState('');
    let [show_token,setShowToken] = useState(false);


    useEffect(()=>{
        console.log(fetchurl)
        if(search_token  && search_token.length > 3){
            setFetchUrl(fetchurl + 'posts?' + 'category=earth' + '&search=' + search_token +'&limit=' + limit + '&date=' + now_date );
            getPosts(fetch_url,setData);
            //console.log('tech');
            //changed if logic
        }else {
            //console.log('nothing2');
            setFetchUrl(fetchurl + '?limit=' + limit+ '&date=' + now_date);
            getPosts(fetch_url,setData);
        }
    },[search_token])
    

    function setSearch(passValue) {
        //search_token = passValue;
        console.log(passValue)
        setSearchToken(passValue);

        if(passValue && passValue.length > 3){
            setShow_spotlight(false);
            console.log(search_token)
            
            setFetchUrl(fetchurl + 'posts?' + 'category=earth' + '&search=' + passValue +'&limit=' + limit + '&date=' + now_date );
            
            getPosts(fetch_url,setData);
            }else{

            setFetchUrl(fetchurl + 'posts' + '?limit=' + limit+ '&date=' + now_date);
            console.log(fetch_url)
            setShowToken(false);
            getPosts(fetch_url,setData);
        }
    }

    return (
        <form onSubmit={(e) => {e.preventDefault() 
            setSearch(search_value.replace(" ",'%20'));
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
                    <div style={Xstyle} type="button"onClick={(e)=>{setSearchValue(""); setSearch('');setShowToken(false)}}>x</div>
                </div>
            </div>
            
        }
        </form>
    );
    }

