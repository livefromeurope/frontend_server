import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Update_Post from './Update_Post';
import europe_countries from './europe_countries2.json'


//https://www.pluralsight.com/guides/fetch-data-from-a-json-file-in-a-react-app


export default function SinglePost({post_id,post_info, post_likes, set_post_likes, set_post_info,post_author,post_content,post_created_date,post_category,post_comment_count,post_votes,post_mongo_id,voted}){
    
    
    const [InfoMessage,setInfoMessage] = useState(0);

    const setInfo = 
    post_info && 
    post_info.type === "is_info" &&
    post_info.id === post_id;

    const setLikes = 
    post_likes && 
    post_likes.includes(post_id);
    //post_likes.type === "voted" &&
    


    //TESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSST
    function get_emoticon(hash,country){
        //console.log(hash)
        //console.log(hash[country][0].emoticon)
        return hash[country][0].emoticon
    }

    
    let emoticon = get_emoticon(europe_countries,post_category)

    
    function copyText() {

        /* Copy text into clipboard */
        let posturl = 'https://www.livefromeurope.eu/post/' + post_id;
        console.log(posturl)
        navigator.clipboard.writeText
            (posturl)
        setInfoMessage(<a>You copied the post. Please share and spread.</a>) 

    }


    return(
                <div className = 'singleposts_bucket' key={post_id} id={post_id}>
                {/*<Link style={{textDecoration: 'none'}}  to={`/post/${post_id}`}> */}
                    <div >
                        <div class ="singleposts" >
                            <div class="row flex-nowrap" >
                                <div class="col-5">
                                    <div class ="postcategory" id="postcategory">
                                        <Link style={{textDecoration: 'none'}}  to={`/category/${post_category}` }>
                                            <div class="category">
                                            {emoticon} {post_category}
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
                                    <div>{post_content}</div>

                                    <div class="post_dates">{post_created_date.split('.')[0].replace("T"," ")}</div>
                            </div>
                        </div>
                    </div>
                {/*</Link>*/}
                <div className="post-container">
                    <div className="post-actions">
                        <div className='row flex-nowrap'>
                            <div className="post-action" >

                                { 
                                    <Link style={{textDecoration: 'none'}}  to={`/post/${post_id}`}>
                                        <button type='button' id='small-button' class="btn btn-primary btn-sm"> 
                                            {post_comment_count} comments
                                        </button>
                                    </Link>
                                
                                }
                            </div>
                            <div className="post-action" >
                            {!setLikes &&
                                <button type='button' onClick={ ()=>(
                                        Update_Post(post_mongo_id,post_votes,null,'vote_update'), 
                                        voted(post_mongo_id+post_votes),
                                        post_likes.push(post_id)
                                        //update posts?
                                        

                                        )} id='small-button' class="btn btn-primary btn-sm"> 
                                    {post_votes} votes
                                </button>
                            }
                            {setLikes &&
                                <button type='button' id='small-button' class="btn btn-primary btn-sm"> 
                                voted
                            </button>
                            }
                            </div> 
                            <div className="post-action" >
                            {
                                <button type='button' onClick={()=> 
                                    {
                                        set_post_info({id: post_id, type: 'is_info'})

                                        copyText()}
                                    }
                                        id='small-button' class="btn btn-primary btn-sm"> 
                                    share
                                </button>
                            }
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

    );
}

//export default Posts(); 