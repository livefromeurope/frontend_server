
import React, {useState, useEffect,useRef } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import useInfiniteScroll from "./useInfiniteScroll";
import SinglePost from "./SinglePost";
import getPosts from './getPosts';
import europe_countries from './europe_countries.json';
import europe_countries_json from './europe_countries2.json';
import { useHorizontalScroll} from './functions/useHorizontalScroll';
import urlify from './functions/urlify';
import Spotlight from './pages/Spotlight_old';
import imageExists from './functions/check_if_img_exists';
import SearchBar from './pages/SearchBar';
import ScrollToTop from './Scroll_To_Top';



//https://www.pluralsight.com/guides/fetch-data-from-a-json-file-in-a-react-app


export default function Posts(props){
    //https://www.npmjs.com/package/multiselect-react-dropdown

    var options = europe_countries
    //const [data,setData] = useState(Array.from(Array(50).keys(), n => n + 1));
    const [data,setData] = useState([]);
    const [vote_update,UpdateVoteUpdate] = useState([]);
    const multiselectRef = React.createRef();
    //let [url, setUrl] = useState();
    const [goodUrl,setgoodUrl] = useState([]);
    const [PostInfo,setPostInfo] = useState([]);
    const [PostLikes,setPostLikes] = useState([]);
    let [fetch_url,setFetchUrl] = useState('');
    let [spotlight_type,setSpotlight_type] = useState('main');
    let [show_spotlight,setShow_spotlight] = useState(false);
    let [url_category,setURLCategory] = useState('');
    let [selected_country,setCountry] = useState({});


    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);
    

    function checkImage(image_url,setgoodUrl,goodUrl,itemid) {
        let link = image_url.match(/(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))/);
    
        fetch(link[0],{
            method: 'HEAD'
        }).then(function(response){
            
            //console.log(response)
            if(response.status == 200){
                
                //console.log(true)
                return true;
                
            }else{
                
                //console.log(false)
                setgoodUrl(goodUrl => [...goodUrl,itemid])
                return false;
    
            }
    
        })
        
    }
    

    //let [selectedValues,setSelectedValues] = useState([])
    //const [saved_MongoPostID,set_saved_MongoPostID] = useState('');
    
    const scrollRef = useHorizontalScroll();

    let limit = 15
    let now_date = new Date().toISOString()
    let fetchurl = process.env.REACT_APP_POSTSERVER_URL
    let baseurl = process.env.REACT_APP_FRONTEND_URL
    let show_fetch = true
    


    function urlBuilder(){

        let window_url = window.location.href;
        if(!window_url.includes('www') && !window_url.includes('localhost')){
            window_url = window_url.replace('https://','https://www.' )
            //setURL(pass_url)
        }
        
        let add = ''
        
        if(window_url === baseurl){

            add = '?limit=' + limit+ '&date=' + now_date
            //show_filter = false
            show_fetch = true
            show_spotlight = false
            setSpotlight_type('main')
            setShow_spotlight(true)
            console.log(0)
            if(props.userid && props.showFilter === true && 1 == 2){
                
                let country = props.userid.toLowerCase()
                props.setSelectedValues([{country},{"country":'europe'}])
                console.log(props.selectedValues)
                
                add = '?category=' + country + '&category=europe&limit=' + limit + '&date=' + now_date
                //getPosts(fetch_url,setData);
            }

        }else if(window_url.match(baseurl+'category/*')){
            let category = window_url.split('/').pop();
            setURLCategory(category)
            add = '?category=' + category + '&limit=' + limit + '&date=' + now_date
            //show_filter = false
            setCountry(europe_countries_json[category])
            show_fetch = true
            setShow_spotlight(true)
            //console.log(1)
            setSpotlight_type('category')
        }else if(window_url.match(baseurl+'user/*')){
            let category = window_url.split('/').pop();
            add = '?author=' + category + '&limit=' + limit+ '&date=' + now_date
            //show_filter = false
            show_fetch = true
            setSpotlight_type('user')
            //console.log(2)
            setShow_spotlight(false)

        }else if(window_url.match(baseurl+'profile/*')){
            let category = window_url.split('/').pop();
            add = '?author=' + category + '&limit=' + limit+ '&date=' + now_date
            //show_filter = false
            show_fetch = true
            //console.log(3)
            setShow_spotlight(false)
        } 
        else{
            let id = window_url.split('/').pop();
            add = '?id=' + id + '&limit=' + limit + '&date=' + now_date
            //show_filter = false
            //console.log(4)
            show_fetch = false
            setSpotlight_type('main')
            setShow_spotlight(true)
        }
        //console.log(fetchurl + 'posts' + add + '&date=' + now_date)
        let setStartUrl = fetchurl + 'posts' + add
        
        setFetchUrl(setStartUrl)

        //fetch_url = setStartUrl

        //getPosts(fetch_url,setData);

    }

    //https://upmostly.com/tutorials/build-an-infinite-scroll-component-in-react-using-react-hooks
    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
    

    function fetchMoreListItems() {
        //hier hol ich mir die neuen daten
        let last_data_item = data.length - 1;
        console.log(last_data_item)
        console.log(fetch_url)
        try{
            let adjusturl = fetch_url.replace(fetch_url.split('=').pop(),data[last_data_item]['created_date'])
            setFetchUrl(adjusturl)
            getPosts(fetch_url,setData,'fetch_more',setIsFetching);

        }catch{
            console.log('nodata found')
        }
        //console.log(data)
        //setData(prevState => ([...prevState, ...Array.from(Array(2).keys(), n => n + prevState.length + 1)]));
        //setIsFetching(false);
    }   

    useEffect(()=>{
        urlBuilder(setShow_spotlight,setSpotlight_type,setURLCategory,setCountry,setFetchUrl,getPosts,setData,fetchurl)
    },[props.userid,props.showFilter])

    useEffect(()=>{
        getPosts(fetch_url,setData);
        },[fetch_url]);
    


    useEffect(()=>{
        getPosts(fetch_url,setData);
        console.log(data);
    },[props.commentUpdate])


    function resetValues(){
        multiselectRef.current.resetSelectedValues();
    }

    

    //if filter adds item
    function onSelect(selectedList, selectedItem){
        let pass = ''
        let selectedcountry = ''
        //console.log(selectedList)
        for (let i = 0; i < selectedList.length; i++) {
            //console.log(selectedList[i]['country']);
            selectedcountry = selectedList[i]['country']
            //console.log(selectedList)
            pass = pass.concat('category=').concat(selectedcountry).concat('&')
            //console.log(pass);
        }
        fetch_url = fetchurl + 'posts?' + pass.slice(0,-1) + '&limit=' + limit + '&date=' + now_date
        setFetchUrl(fetchurl + 'posts?' + pass.slice(0,-1) + '&limit=' + limit + '&date=' + now_date);
        //console.log(url)
        getPosts(fetch_url,setData);
    };



    //if filter removes item
    function onRemove(selectedList, removedItem){
        let pass = ''
        let selectedcountry = ''
        for (let i = 0; i < selectedList.length; i++) {
            //console.log(selectedList[i]['country']);
            selectedcountry = selectedList[i]['country']
            //console.log(selectedcountry)
            pass = pass.concat('category=').concat(selectedcountry).concat('&')
        }
        fetch_url = fetchurl + 'posts?' + pass.slice(0,-1) + '&limit=' + limit + '&date=' + now_date
        setFetchUrl(fetchurl + 'posts?' + pass.slice(0,-1) + '&limit=' + limit + '&date=' + now_date)
        getPosts(fetch_url,setData);
        
    };

    //https://stackoverflow.com/questions/57778950/how-to-load-more-search-results-when-scrolling-down-the-page-in-react-js



    return(
        <div className="jumbotron">
            

            {loading ? (
            <div className="loader-container">
                <img src="../icons/loading.svg"></img>
            </div>
            ) : (
    


            <div>
                
                <div>
                    {props.showFilter &&
                        <SearchBar
                            setShow_spotlight={setShow_spotlight}
                            setData={setData}
                            setFetchUrl={setFetchUrl}
                            fetch_url={fetch_url}
                        />

                    }
                </div>
                

            {show_spotlight  &&  <div className='Spotlight'>
                <div>
                    <Spotlight
                        type = {spotlight_type}
                        category = {url_category}
                        selected_country = {selected_country}
                    />  
                </div>
                lfe-posts:
                </div>
            }

            {

                data && data.length>0 && data.map( (item) => 
                        {
                            //const good_url = goodUrl && goodUrl.includes(item.id);
                            //checkImage(item.content,setgoodUrl,goodUrl,item.id);
                            var good_url = false;
                            if(!good_url){
                            //{imageExists(item.content) && 
                            return <SinglePost
                                key={item.id} 
                                post_id={item.id}
                                post_info={PostInfo}
                                set_post_info={setPostInfo}
                                post_author={item.author}
                                post_content={urlify(item.content)}
                                post_image={item.image}
                                post_created_date={item.created_date}
                                post_category={item.category}
                                post_comment_count={item.comment_count}
                                post_votes={item.votes}
                                post_mongo_id={item._id}                    
                                voted={UpdateVoteUpdate}
                                post_likes={PostLikes}
                                set_post_likes={setPostLikes}
                                set_saved_MongoPostID={props.setSavedMongoPostID}
                                saved_MongoPostID={props.savedMongoPostID}
                            />
                            }else{
                                return <div></div>
                            }
                        }
                ) || (<div>no posts found. search again</div>)
                
            }


            {show_fetch && 
            <div id="fetch_button_container"> 
                <button type='button' onClick={fetchMoreListItems} id="fetch_button" className="btn">fetch more...</button>   
            </div>
            }
            </div>
        )}
        <ScrollToTop/>
        
    </div>
    );
}