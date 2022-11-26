import React from 'react';
import Posts from './Posts';
import Postform from './Postform';
import { useState,useEffect} from 'react';
import Scroll_To_Top from './Scroll_To_Top';
import useAuth from './useAuth';
import { useNavigate } from "react-router-dom";


function Home(props){

    
    let [comment_update, UpdateCommentUpdate] = useState('');
    let {auth} = useAuth();
    let [show_postform, MakePosform_Show] = useState(false);
    let [postform_button, ChangePostform_button] = useState('Create Post');
    
    let [show_filter, MakeFilter_Show] = useState(true);
    let [filter_button, ChangeFilter_button] = useState('Hide & Remove Filter');
    let [selectedValues,setSelectedValues] = useState([])

    //let [show_filter, MakeFilter_Show] = useState(false);
    //let [filter_button, ChangeFilter_button] = useState('Filter Content');


    //console.log(props.userid)

    function ShowPostform(){
        if(show_postform === false){
                MakePosform_Show(true)
                ChangePostform_button('Hide Postform')

            }else{
                MakePosform_Show(false)
                ChangePostform_button('Create Post')
            }
    }

    const [saved_MongoPostID,set_saved_MongoPostID] = useState({});

    function ShowFilter(){
        if(show_filter === false){

                MakeFilter_Show(true)
                ChangeFilter_button('Hide Filter')

            }else{

                MakeFilter_Show(false)
                setSelectedValues([])
                ChangeFilter_button('Filter Content')

            }
    }

    let navigate = useNavigate();

    function Navigate_toLogin(){
        let path = "/login"
        navigate(path);
    }

    return(

        <section>
            <div class= "container">
                    {/*<div>Welcome stranger from  {userid.region}, {userid.country_name}</div> */}
                    <div class="post_button_container">

                        {
                            <button type='button' onClick={()=>{
                                if(auth.username){
                                ShowPostform()
                                }else{
                                    Navigate_toLogin()
                                }
                                }}id='small-button' class="btn btn-primary btn-sm"> 
                                    {postform_button}
                            </button>
                        }

                        {show_postform || 
                            <button type='button' onClick={()=>{ShowFilter()}}id='small-button' class="btn btn-primary btn-sm"> 
                                {filter_button}
                            </button>
                        }
                        {show_postform && <Postform Update_Trigger={UpdateCommentUpdate} />}

                        
                    
                    </div>
                    <div>
                        <Posts
                        comment_update={comment_update} 
                        show_filter={show_filter} 
                        MakeFilter_Show={MakeFilter_Show} 
                        userid={props.userid}
                        saved_MongoPostID={saved_MongoPostID}
                        set_saved_MongoPostID={set_saved_MongoPostID}
                        selectedValues={selectedValues}
                        setSelectedValues={setSelectedValues}

                        />
                    </div>
                        <Scroll_To_Top/> 
                    <div>
                    </div>
            </div>
        </section>

    );

}

export default Home;