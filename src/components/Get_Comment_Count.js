

async function Get_Comment_Count(pass_url,setCommentCount){

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

            
            setCommentCount(myJson.comment_count)
            console.log(myJson.comment_count);
            // iterate over the comments again and correctly nest the children
        }
        )
}

export default Get_Comment_Count;
