
async function Update_Comment(update_type,mongo_comment_id,comment_upvotes,setCommentUpdate){

    

    let uri = process.env.REACT_APP_COMMENTSERVER_URL + 'comments/' + mongo_comment_id
    let created_date = new Date().toISOString()
    if(update_type === 'delete'){

            fetch(uri, 
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'}
        })  .then(response => response.json())
            .then(data => console.log(data));

    }else if(update_type === 'vote_update'){
        
        console.log('vote_update')
        console.log(mongo_comment_id)
        let new_comment_count = Number(comment_upvotes) + 1
        console.log(Number(new_comment_count))
        let body_json = {}
        body_json.upvotes = Number(new_comment_count)
        body_json.update_type = 'vote_update'

            fetch(uri, 
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(body_json)
        })  .then(response => response.json())
            .then(data => console.log(data));
            let commetnupdate = mongo_comment_id + created_date
            setCommentUpdate(commetnupdate);
    }
}

export default Update_Comment;