import React from 'react';
import { useState, useEffect,useRef  } from 'react';
import CommentObject from './Comment';
import CommentForm from './Comment_Form';

export default function Comment_Section({MongoPostID}){
    
        const Comment_Area = useRef();
        const url = window.location.href;
        const id = url.split('/').pop();
        let get_url = process.env.REACT_APP_COMMENTSERVER_URL + "comments"

        let limit = 20;
        let add = '?post_id=' + id + '&limit=' + limit + '&type=get_comment'
        get_url = get_url + add
        //console.log(get_url)

        const [activeComment,setActiveComment] = useState([]);
        const [nestedComments,setnestedComments] = useState([]);
        const [commentUpdate,setCommentUpdate] = useState('');
        //console.log(url);

        const getComments = (get_url) =>{
            
            fetch(get_url,{
                method: 'GET',
                headers: 
                {
                    'Content-Type': 'application/json',
                }
            }
            ).then( function(resp){
                return resp.json();
            }).then(async function(commentJson){
                //console.log(commentJson.comments);
                let commentList = commentJson.comments
                //console.log('nest comments')
                setnestedComments(nestComments(commentList))
                //console.log(nestedComments)
                // iterate over the comments again and correctly nest the children
        }
            )};

            //create nested comments array
            //https://stackoverflow.com/questions/36829778/rendering-nested-threaded-comments-in-react
            function nestComments(commentList) {
                const commentMap = {};
            
                // move all the comments into a map of id => comment
                commentList.forEach(comment => commentMap[comment.id] = comment);
            
                // iterate over the comments again and correctly nest the children
                commentList.forEach(comment => {
                    if(comment.referencing_comment_id !== '') {
                    const parent = commentMap[comment.referencing_comment_id];
                    (parent.children = parent.children || []).push(comment);
                    }
                });

                // filter the list to return a list of correctly nested comments
                return commentList.filter(comment => {
                    return comment.referencing_comment_id === '';
                });
            }    


        useEffect(()=>{
            getComments(get_url)
        },[commentUpdate]   
        )

        
        //https://www.youtube.com/watch?v=sjAeLwuezxo


    return(
        <section>
                <div className= "container">

                    <CommentForm

                    post_id={id}
                    comment_label='write'
                    setCommentUpdate={setCommentUpdate}
                    setActiveComment={setActiveComment}
                    MongoPostID={MongoPostID}

                    />
                </div>
                <div>
                    {
                    nestedComments && nestedComments.length>0 && nestedComments.map((comment)=>
                        <div>
                            <div>
                                <CommentObject

                                    comment_mongo_id={comment._id} 
                                    comment_id={comment.id} 
                                    comment_author={comment.author} 
                                    comment_comment={comment.comment}
                                    comment_created_date={comment.created_date}
                                    comment_replies={comment.children}
                                    comment_upvotes={comment.upvotes}
                                    activeComment={activeComment}
                                    setActiveComment={setActiveComment}
                                    setCommentUpdate={setCommentUpdate}
                                    MongoPostID={MongoPostID}

                                    />
                            </div>
                        </div>
                    )
                    }
            </div>
        </section>
    );
}
