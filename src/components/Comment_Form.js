import React from 'react';
import {useRef, useState, useEffect} from 'react';
import Make_Comment from './Make_Comment';
import Get_Comment_Count from './Get_Comment_Count';
import Update_Post from './Update_Post';
import useAuth from './useAuth';



function CommentFormObject({post_reference_id,comment_label,setCommentUpdate,isReplying,activeComment,setActiveComment,MongoPostID}){
    const url = window.location.href;
    const post_id = url.split('/').pop();
    const Comment_Area = useRef();
    const [comment_count,setCommentCount] = useState(0);
    const {auth} = useAuth();

    let get_url = process.env.REACT_APP_COMMENTSERVER_URL + "comments"

    let limit = 20;
    let add = '?post_id=' + post_id + '&limit=' + limit + '&type=get_comment_count'
    get_url = get_url + add
    //console.log(get_url)



    useEffect(()=>{
        Get_Comment_Count(get_url,setCommentCount)
        //console.log(comment_count + 'commentcount')
        
    },[comment_count])


    return(
        (auth.username &&
        <section>
            <div className= "write_comment">
                    <form>
                    <div className="form-group">
                        <textarea className="form-control" id="Comment_Area" rows="1" ref={Comment_Area} placeholder="write comment"></textarea>
                        <div className="col" id="post-btn">
                            <button type='button' onClick=
                            {
                                ()=>(Make_Comment(Comment_Area.current.value,post_id, auth.username, post_reference_id,setCommentUpdate)
                                ,setCommentUpdate(new Date().toISOString()),Comment_Area.current.value = '', setActiveComment([])
                                //,Get_Comment_Count(get_url,setCommentCount)
                                ,Update_Post(MongoPostID,null,comment_count,'comment_count_update')
                                )
                            }
                                className="btn btn-md btn-outline btn-primary">{comment_label}</button>
                        </div>
                    </div>    
                    </form>
                </div>
        </section>
        )
    );
}

export default CommentFormObject;