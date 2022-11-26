import Get_Posts from "./Get_Posts";
import Get_Comment_Count from "./Get_Comment_Count"


async function Update_Post(mongo_post_id,existing_votes,existing_comment_count,updatetype){
        
        

        let new_comment_count = Number(existing_comment_count) + 1;
        let url =  process.env.REACT_APP_POSTSERVER_URL +'posts/' + mongo_post_id
        let new_votes = Number(existing_votes) + 1;
        console.log(url)
        console.log(new_comment_count)
        let body_json = {}
        console.log(updatetype)
        if(updatetype == 'vote_update'){
            body_json.updatetype = updatetype
            body_json.votes = new_votes

        }else if(updatetype == 'comment_count_update'){


            body_json.updatetype = updatetype
            body_json.comment_count = new_comment_count
        } else{
            console.log('no update')
        }
            fetch(url, 
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(body_json)
        })  .then(response => response.json())
            .then(data => console.log(data));
            Get_Posts(url)
}

export default Update_Post;