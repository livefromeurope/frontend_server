
async function Get_User_IP(setUserID,userid){
        let pass_url = 'https://ipapi.co/json'
        
        fetch(pass_url,{
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
            }
        }
        ).then(function(response){
            return response.json();
        }).then(function(myJson){
            setUserID(myJson);
            //console.log(userid)
            let Index = new Date().toISOString().split('T')[0] + '_' + myJson['ip'].replace('.','')
            //console.log('Index' + Index)


            let body_json = 
            {
                'Index': Index,
                'JSON': myJson,
                'IP':myJson['ip']
            }
            //console.log(myJson['ip'])
            let url = process.env.REACT_APP_AUTHSERVER_URL + 'user/track'
            fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body_json)
            }).then(function(response){
                return response.json();
            });
        });
}


export default Get_User_IP;
