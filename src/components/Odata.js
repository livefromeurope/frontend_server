import React , {useState, useEffect }from 'react';
import json from './opendata.json';



function Odata(){

    let [data,setData]=useState([]);
    const getData = () =>{
            setData(json);
    }
    useEffect(()=>{
        getData()
    },[])

    console.log(data)


    return(
        <section>
            <div className= "container">
                <div>
                < oda />
                {
                data && data.length>0 && data.map((item)=>
                <div id={item.country} >
                    <div><strong>{item.country}: </strong><a href={item.url} target="_blank">{item.url}</a>  </div>
                </div>
                )}
                    
                    
                </div>

            </div>
        </section>
    );
}

export default Odata;