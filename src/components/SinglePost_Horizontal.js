import React, {useState, useEffect} from 'react';

export default function SinglePost_Horizontal({post_id,post_content}){
    
    


    return(
                <div className = 'singleposts_horiz_bucket' key={post_id} id={post_id}>
                <div >
                            <div className="main-content-horiz">
                                    <div>{post_content}</div>
                            </div>
                        </div>
                    </div>

    );
}

//export default Posts(); 