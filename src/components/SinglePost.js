import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Update_Post from './Update_Post';
import europe_countries from './europe_countries2.json'
import useAuth from './useAuth';
import imageExists from './functions/check_if_img_exists';



//https://www.pluralsight.com/guides/fetch-data-from-a-json-file-in-a-react-app


export default function SinglePost({post_id,post_info, post_likes, set_post_likes, set_post_info,post_author,post_content,post_created_date,post_category,post_comment_count,post_votes,post_mongo_id,voted}){
    
    
    const [InfoMessage,setInfoMessage] = useState(0);
    let {auth} = useAuth();

    const setInfo = 
    post_info && 
    post_info.type === "is_info" &&
    post_info.id === post_id;


    //calc duration
    let currentTime = new Date()
    let expireTime = new Date(post_created_date);
    let minutes = Math.round((currentTime - expireTime) / (1000 * 60));
    let duration;
    if(minutes < 60){
        duration = minutes + 'm'
    }else if(minutes <  1440){
        duration = Math.round(minutes/60) + 'h'
    }else{
        duration = Math.round(minutes/1440) + 'd'
    }
    //console.log(duration)


    const setLikes = 
    post_likes && 
    post_likes.includes(post_id);
    //post_likes.type === "voted" &&
    


    function get_emoticon(hash,country){
        //console.log(hash)
        //console.log(hash[country][0].emoticon)
        return hash[country][0].emoticon
    }

    
    //let emoticon = get_emoticon(europe_countries,post_category)
    //console.log(post_category)
    let emoticon = ''
    
    function copyText() {

        /* Copy text into clipboard */
        let posturl = 'https://www.livefromeurope.eu/post/' + post_id;
        console.log(posturl)
        navigator.clipboard.writeText
            (posturl)
        setInfoMessage(<a>You copied the post. share and spread.</a>) 

    }
    
    return(
        <div>
            <div className = 'singleposts_bucket' key={post_id} id={post_id}>
                {/*<Link style={{textDecoration: 'none'}}  to={`/post/${post_id}`}> */}
                <div>
                    <div>
                        <div class ="singleposts" >
                            <div class="row flex-nowrap" >
                                <div class="col-5">
                                    <div class ="postcategory" id="postcategory">
                                        <Link style={{textDecoration: 'none'}}  to={`/category/${post_category}` }>
                                            <div class="category">
                                            {emoticon} {post_category} • {duration}
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div class="col-5">
                                <div class ="usr">
                                <Link style={{textDecoration: 'none'}}  to={`/user/${post_author}`}>
                                        <div class="usr_name">
                                            @{post_author}
                                        </div>
                                </Link>
                                </div>
                                </div>
                                
                            </div>
                            
                            <div class="main-content">
                            <h1 class="main-content">{post_content}</h1>

                                    {/*<div class="post_dates">{post_created_date.split('.')[0].replace("T"," ")}</div>
                                    <div class="post_dates">{duration}</div>*/}

                            </div>
                            
                        </div>
                    </div>
                {/*</Link>*/}
                <div className="post-container">
                    <div className='row flex-nowrap'>                
                        <div className="post-action-left" >
                            {auth.image &&
                                <div>
                                <button type='button' onClick={()=> 
                                    {
                                        if(window.confirm('Are you sure to delete post?')){
                                        Update_Post(post_mongo_id,null,null,'delete')
                                        console.log('delete') 
                                        }   
                                    }
                                    }
                                        id='small-button' class="btn btn-primary btn-sm"> 
                                    delete
                                </button>
                                </div>
                            }
                        </div>

                        <div className="post-actions-right">

                        <div className='row flex-nowrap'>

                            <div className="post-action" >
                                {
                                    <div id = 'post-icons'>
                                        <label for="share" onClick={()=> 
                                            {
                                                set_post_info({id: post_id, type: 'is_info'})
                                                copyText()}
                                            }>
                                            <img id="upload_img" style={{width: '20px',"margin-top":"25%"}} src="../icons/share.png" />
                                        </label>
                                    </div>
                                }
                            </div> 

                            <div className="post-action" >

                                <Link style={{textDecoration: 'none'}}  to={`/post/${post_id}`}>
                                    <div id = 'post-icons'>
                                        <label for="comments">
                                            <img id="comments_img" style={{width: '20px',"margin-top":"20%"}} src="../icons/comments.png" />
                                            {post_comment_count}
                                        </label>
                                    </div>
                                </Link>
                            </div>
                            <div className="post-action" >
                                    {!setLikes &&
                                        <div id = 'post-icons'>
                                            <label for='vote' onClick={ ()=>(
                                                    Update_Post(post_mongo_id,post_votes,null,'vote_update'), 
                                                    voted(post_mongo_id+post_votes),
                                                    post_likes.push(post_id)
                                                    //update posts?
                                                    )} >
                                                <img id="upload_img" style={{width: '20px',"margin-top":"20%","margin-right":'5px'}} src="../icons/star_nofill.png" />
                                                {post_votes}
                                            </label>
                                        </div>

                                    }
                                    {setLikes &&
                                        <div id = 'post-icons'>
                                            <label for='vote'>
                                                
                                                <img id="upload_img" style={{width: '25px',"margin-top":"8%","padding-left":"1px","margin-right":"8px"}} src="../icons/star_fill.png" />
                                            </label>
                                        </div>
                                    }
                            </div> 
                                </div>
                            </div> 
                        </div>

                    </div>

                    </div>
                    {setInfo &&
                    <div className="postinfobox">
                        {InfoMessage}
                    </div>
                    }

                    
            
                </div>
        </div>
        
    )
    
}


//export default Posts(); 