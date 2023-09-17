import React from 'react';
import Posts from './Posts';
import Postform from './Postform';
import { useState,useEffect} from 'react';
import ScrollToTop from './Scroll_To_Top';
import useAuth from './useAuth';
import { useNavigate } from "react-router-dom";



function Home(props){

    
    const [commentUpdate, setCommentUpdate] = useState('');
    const { auth } = useAuth();
    const [showPostform, setShowPostform] = useState(false);
    const [postformButton, setPostformButton] = useState('Create Post');
    const [showFilter, setShowFilter] = useState(true);
    const [filterButton, setFilterButton] = useState('Hide & Remove Filter');
    const [selectedValues, setSelectedValues] = useState([]);
    const navigate = useNavigate();
    const [savedMongoPostID,setSavedMongoPostID] = useState({});




    function togglePostform() {
        if (showPostform === false) {
            setShowPostform(true);
            setPostformButton('Hide Postform');
        } else {
            setShowPostform(false);
            setPostformButton('Create Post');
        }
    }

    function toggleFilter() {
        if (showFilter === false) {
            setShowFilter(true);
            setFilterButton('Hide Filter');
        } else {
            setShowFilter(false);
            setSelectedValues([]);
            setFilterButton('Filter Content');
        }
    }

    function navigateToLogin() {
        let path = "/login";
        navigate(path);
    }

    return (
        <section>
            <div className="container">
                <div className="post_button_container">
                    <button type='button' onClick={() => {
                        if (auth.username) {
                            togglePostform();
                        } else {
                            navigateToLogin();
                        }
                    }} id='small-button' className="btn btn-primary btn-sm">
                        {postformButton}
                    </button>
                    {showPostform ||
                        <button type='button' onClick={toggleFilter} id='small-button' className="btn btn-primary btn-sm">
                            {filterButton}
                        </button>
                    }
                    {showPostform && <Postform UpdateTrigger={setCommentUpdate} />}
                </div>
                <div>
                    <Posts
                        commentUpdate={commentUpdate}
                        showFilter={showFilter}
                        setShowFilter={setShowFilter}
                        userid={props.userid}
                        savedMongoPostID={savedMongoPostID}
                        setSavedMongoPostID={setSavedMongoPostID}
                        selectedValues={selectedValues}
                        setSelectedValues={setSelectedValues}
                    />
                </div>
                <ScrollToTop />
                <div>
                </div>
            </div>
        </section>
    );
}

export default Home;