

async function Make_Comment(comment,post_id,user,post_reference_id,setCommentUpdate){
    
    let created_date = new Date().toISOString()
    var randomstring = post_id + "_"+ Math.random().toString(36).slice(-15);

    if(!post_reference_id){
        post_reference_id = ''
    }


    if(comment){
            let body_json = 
            {
                'id': String(randomstring),
                'post_id': String(post_id),
                'referencing_comment_id': String(post_reference_id),
                'author': user,
                'comment': comment,
                'created_date': created_date,
                'upvotes': 0
            }
            await fetch(process.env.REACT_APP_COMMENTSERVER_URL +'comments', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body_json)
            })  .then(response => response.json())
                .then(data => console.log(data));
                let commetnupdate = comment + created_date
                setCommentUpdate(commetnupdate);


        }else{
            //console.log("PFLICHTFELD")
        };
}

export default Make_Comment