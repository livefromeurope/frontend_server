
async function Get_UserData(passurl, setUserdata){
        console.log("get data from: " + passurl);
        fetch(passurl,{
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
            },
        }
        ).then(function(response){
            
            return response.json();
        }).then(function(myJson){
            setUserdata(myJson);
            console.log('pass');
            
    });
}

export default Get_UserData;

