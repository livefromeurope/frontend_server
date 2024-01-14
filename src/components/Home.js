// React and Hooks
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// Components
import Posts from './Posts';
import Postform from './Postform';
import ScrollToTop from './Scroll_To_Top';
import useAuth from './useAuth';


function Home(props) {
    const [commentUpdate, setCommentUpdate] = useState('');
    const { auth } = useAuth();
    const [showPostform, setShowPostform] = useState(false);
    const [postformButton, setPostformButton] = useState('Create Post');
    const [showFilter, setShowFilter] = useState(true);
    const [filterButton, setFilterButton] = useState('Hide & Remove Filter');
    const [selectedValues, setSelectedValues] = useState([]);
    const navigate = useNavigate();
    const [savedMongoPostID, setSavedMongoPostID] = useState({});

    const handleTogglePostform = () => {
        setShowPostform(!showPostform);
        setPostformButton(showPostform ? 'Create Post' : 'Hide Postform');
    }

    const handleToggleFilter = () => {
        setShowFilter(!showFilter);
        setSelectedValues(showFilter ? [] : selectedValues);
        setFilterButton(showFilter ? 'Filter Content' : 'Hide Filter');
    }

    const redirectToLogin = () => {
        navigate("/login");
    }

    return (
        <section>
            <div className="container">
                <div className="post_button_container">
                    <button 
                        type='button' 
                        onClick={auth.username ? handleTogglePostform : redirectToLogin} 
                        id='small-button' 
                        className="btn btn-primary btn-sm"
                    >
                        {postformButton}
                    </button>
                    {!showPostform && 
                        <button 
                            type='button' 
                            onClick={handleToggleFilter} 
                            id='small-button' 
                            className="btn btn-primary btn-sm"
                        >
                            {filterButton}
                        </button>
                    }
                    {showPostform && <Postform UpdateTrigger={setCommentUpdate} />}
                </div>
                
                
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
        </section>
    );
}

export default Home;