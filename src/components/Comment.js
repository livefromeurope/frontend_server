import React from 'react';
import CommentForm from './Comment_Form';
import Update_Comment from './Update_Comment';

function CommentObject ({comment_mongo_id,comment_id,comment_author,comment_comment,addComment,comment_created_date,comment_upvotes,comment_replies,activeComment,setActiveComment,setCommentUpdate,MongoPostID }){
    const canReply = true
    const canEdit = true
    const canDelete = false
    const isReplying = 
        activeComment && 
        activeComment.type === "replying" &&
        activeComment.id === comment_id;
    const isEditing = 
        activeComment && 
        activeComment.type === "editing" &&
        activeComment.id === comment_id;


    return(
        <section>
            <div class="comments_container">
                <div class = 'comments_bucket' key={comment_id} id={comment_id}  >
                        <div class="comment_usr">
                            <div class="comment_usr_name">
                                {comment_author}
                            </div>
                        </div>
                        <div class="comment-body">
                                <div class='comment' >
                                {!isEditing && <div>{comment_comment}</div>}
                                <div class="post_dates">{comment_created_date}</div>
                                <div class='comment-actions'>
                                    <div class="row">
                                        {canReply && <div class="comment-action" type='button' onClick={()=>
                                                setActiveComment({id: comment_id, type: 'replying'})}>Reply</div>}
                                        {canEdit && <div type='button' class="comment-action" onClick={async ()=>{
                                                if(window.confirm('Are you sure to delete comment?'))
                                                {Update_Comment('delete',comment_mongo_id,null,setCommentUpdate)
                                                setCommentUpdate(new Date().toISOString())}}}>Delete</div>}
                                        {canEdit && <div class="comment-action" type='button' onClick={()=>
                                                {Update_Comment('vote_update',comment_mongo_id,comment_upvotes,setCommentUpdate)
                                                setCommentUpdate(new Date().toISOString())
                                                }}>{comment_upvotes} vote</div>}
                                    </div> 
                                </div>   
                        </div>                 
                    </div>
                    {isReplying && 
                    ( <CommentForm
                    post_reference_id={comment_id}
                    comment_label='reply'
                    setCommentUpdate={setCommentUpdate}
                    setActiveComment={setActiveComment}
                    MongoPostID={MongoPostID}
                    />)}
                    {isEditing && 
                    ( <CommentForm
                    post_reference_id={comment_id}
                    comment_label='edit'
                    setCommentUpdate={setCommentUpdate}
                    setActiveComment={setActiveComment}
                    MongoPostID={MongoPostID}
                    />)} 
                </div>

                {comment_replies && comment_replies.length > 0 && (
                            <div className="replies">
                                {comment_replies.map(reply => (
                                    <CommentObject 
                                    comment_mongo_id={reply._id} 
                                    comment_id={reply.id} 
                                    comment_author={reply.author} 
                                    comment_comment={reply.comment}
                                    comment_created_date={reply.created_date}
                                    comment_upvotes={reply.upvotes}
                                    addComment={addComment}
                                    comment_replies={reply.children}
                                    activeComment={activeComment}
                                    setActiveComment={setActiveComment}
                                    setCommentUpdate={setCommentUpdate}
                                    MongoPostID={MongoPostID}

                                    />
                                ))}
                            </div>
                        )}
                </div>
        </section>
    );
}

export default CommentObject;