import React, {useState,useEffect} from 'react'
import Get_Posts from '../Get_Posts';


export default function SearchBar({setData}){
    const BarStyle = {width:"100%",background:"#F0F0F0", "border-radius":"20px",border:"none", padding:"0.5rem"};
    
    let fetchurl = process.env.REACT_APP_POSTSERVER_URL
    let limit = 15
    let now_date = new Date().toISOString()
    let [search_token,setSearchToken] = useState('');
    let [search_value,setSearchValue] = useState('');
    let [fetch_url,setFetchUrl] = useState('');
    //let search_token = ''


    //console.log(url)
    
    useEffect(()=>{
        if(search_token  && search_token.length > 3){
            setFetchUrl(fetchurl + 'posts?' + 'category=earth' + '&search=' + search_token +'&limit=' + limit + '&date=' + now_date );
            Get_Posts(fetch_url,setData);
        }else{
            setFetchUrl(fetchurl + '?limit=' + limit+ '&date=' + now_date);
            Get_Posts(fetch_url,setData);
        }
    },[search_token])
    

    function setSearch(passValue) {
        //search_token = passValue;
        console.log(passValue)
        setSearchToken(passValue);
        if(passValue && passValue.length > 3){
            
            console.log(search_token)

            setFetchUrl(fetchurl + 'posts?' + 'category=earth' + '&search=' + passValue +'&limit=' + limit + '&date=' + now_date );
            Get_Posts(fetch_url,setData);
            console.log(fetch_url)
        }else{
            setFetchUrl(fetchurl + 'posts' + '?limit=' + limit+ '&date=' + now_date);
            console.log(fetch_url)
            Get_Posts(fetch_url,setData);
        }
    }


    return (
        <form onSubmit={(e) => {e.preventDefault() 
            setSearch(search_value.replace(" ",'%20'))}}>
        <input 
            style={BarStyle}
            key="search-bar"
            value={search_value}
            placeholder={"search livefromeurope"}
            //onChange={(e) => setSearch(e.target.value)}
            onChange={(e) => setSearchValue(e.target.value)}
        />
        {search_value}
        </form>
    );
    }

