
async function Get_Posts(pass_url, setData,fetchtype, setIsFetching){
        //console.log("get data from: " + pass_url);
        fetch(pass_url,{
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
            }
        }
        ).then(function(response){
            //console.log(response.json())
            return response.json();
            
        }).then(function(myJson){
            if(fetchtype){
                setData(prevState => (
                
                [...prevState, ...myJson.posts]
                ));
                setIsFetching(false);
                console.log('fetching')
            }else{
                setData(myJson.posts);
                
            }
        });
}

export default Get_Posts;

