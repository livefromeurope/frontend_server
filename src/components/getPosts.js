
async function getPosts(pass_url, setData,fetchtype, setIsFetching){
        //console.log("get data from: " + pass_url);
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
            if(fetchtype){
                setData(prevState => (
                
                [...prevState, ...myJson.posts]
                ));
                setIsFetching(false);
                console.log('######## fetching...')
            }else{
                console.log('######## dataget...')
                setData(myJson.posts);
                
            }
        });
}

export default getPosts;

