import React from 'react';
import Posts from './Posts';
import { useState, useEffect,setShowMessage  } from 'react';
import Comment_Section from './Comment_Section';
import getPosts from './getPosts';
import SinglePost from './SinglePost';
import urlify from './functions/urlify';





function checkImage(image_url,setgoodUrl) {
    let link = image_url.match(/(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))/);

    fetch(link[0],{
        method: 'HEAD'
    }
    ).then(function(response){
        
        //console.log(response)
        if(response.status == 200){
            
            console.log(true)
            setgoodUrl(true)
            return true;
            
        }else{
            
            console.log(false)
            setgoodUrl(false)
            return false;

        }

    })
    
}



function Post(){
    //const [single_post_url, setsingle_post_url] = useState('');
    const [postdata, setpostData] = useState([]);
    const [goodUrl, setgoodUrl] = useState(true);
    
    const [vote_update,UpdateVoteUpdate] = useState([]);
    const [PostLikes,setPostLikes] = useState([]);
    const [PostInfo,setPostInfo] = useState([]);

    const url = window.location.href;
    const id = url.split('/').pop();

    const [saved_MongoPostID,set_saved_MongoPostID] = useState({});


    useEffect(()=>{
        
        //query_params()
        let now_date = new Date().toISOString()
        let single_post_url = process.env.REACT_APP_POSTSERVER_URL + 'posts?id=' + id + '&limit=1&date=' +now_date
        //single_post_url = 'http://localhost:9000/posts?id=6ak9k6jgo8kgq&limit=15&date=2022-11-08T22:03:00.321Z'
        console.log(single_post_url)
        getPosts(single_post_url,setpostData)
        console.log(postdata)

    },[])
    


    return(
        <section>
            
            
            <div className= "container">
            <div>
            {
                postdata && postdata.length>0 && postdata.map((post)=>{
                //checkImage(post.content,setgoodUrl)
                //setgoodUrl(true)
                var goodUrl = true
                if(goodUrl){
                    return  <div>
                            <SinglePost
                                post_id={post.id}
                                post_info={PostInfo}
                                set_post_info={setPostInfo}
                                post_author={post.author}
                                post_content={urlify(post.content)}
                                post_image={post.image}
                                post_created_date={post.created_date}
                                post_category={post.category}
                                post_comment_count={post.comment_count}
                                post_votes={post.votes}
                                post_mongo_id={post._id}
                                voted={UpdateVoteUpdate}
                                post_likes={PostLikes}
                                set_post_likes={setPostLikes}
                            />
                            <div><Comment_Section
                                MongoPostID={post._id}
                            /></div>
                            </div>;
                }
                }
                )

            }

            </div>

                
            </div>
        </section>
    );
}

export default Post;
