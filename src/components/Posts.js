import React, {useState, useEffect,useRef } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import useInfiniteScroll from "./useInfiniteScroll";
import SinglePost from "./SinglePost";
import Get_Posts from './Get_Posts';
import europe_countries from './europe_countries.json';
import europe_countries_json from './europe_countries2.json';
import { useHorizontalScroll} from './functions/useHorizontalScroll';
import urlify from './functions/urlify';
import Spotlight from './pages/Spotlight';
import imageExists from './functions/check_if_img_exists';


//https://www.pluralsight.com/guides/fetch-data-from-a-json-file-in-a-react-app


export default function Posts(props){
    //https://www.npmjs.com/package/multiselect-react-dropdown

    var options = europe_countries

    const [value_dd, setValue] = React.useState({});
    //const [data,setData] = useState(Array.from(Array(50).keys(), n => n + 1));
    const [data,setData] = useState([]);
    const [vote_update,UpdateVoteUpdate] = useState([]);
    const multiselectRef = React.createRef();
    //let [url, setUrl] = useState();
    const [PostInfo,setPostInfo] = useState([]);
    const [PostLikes,setPostLikes] = useState([]);
    let [fetch_url,setFetchUrl] = useState('');
    let [spotlight_type,setSpotlight_type] = useState('main');
    let [show_spotlight,setShow_spotlight] = useState(true);
    let [url_category,setURLCategory] = useState('');
    let [selected_country,setCountry] = useState({});


    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    

    

    //let [selectedValues,setSelectedValues] = useState([])

    //const [saved_MongoPostID,set_saved_MongoPostID] = useState('');
    const scrollRef = useHorizontalScroll();

    let limit = 15
    let now_date = new Date().toISOString()
    let fetchurl = process.env.REACT_APP_POSTSERVER_URL
    let baseurl = process.env.REACT_APP_FRONTEND_URL
    let show_fetch = true


    
    function set_fetch_url(){
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
            show_spotlight = true
            setSpotlight_type('main')
            setShow_spotlight(true)
            console.log(0)
            if(props.userid && props.show_filter === true && 1 == 2){
                

                let country = props.userid.toLowerCase()
                props.setSelectedValues([{country},{"country":'europe'}])

                console.log(props.selectedValues)
                
                add = '?category=' + country + '&category=europe&limit=' + limit + '&date=' + now_date
                //Get_Posts(fetch_url,setData);
            }

        }else if(window_url.match(baseurl+'category/*')){
            let category = window_url.split('/').pop();
            setURLCategory(category)
            add = '?category=' + category + '&limit=' + limit + '&date=' + now_date
            //show_filter = false
            setCountry(europe_countries_json[category])
            show_fetch = true
            setShow_spotlight(true)
            console.log(1)
            setSpotlight_type('category')
        }else if(window_url.match(baseurl+'user/*')){
            let category = window_url.split('/').pop();
            add = '?author=' + category + '&limit=' + limit+ '&date=' + now_date
            //show_filter = false
            show_fetch = true
            setSpotlight_type('user')
            console.log(2)
            setShow_spotlight(false)

        }else if(window_url.match(baseurl+'profile/*')){
            let category = window_url.split('/').pop();
            add = '?author=' + category + '&limit=' + limit+ '&date=' + now_date
            //show_filter = false
            show_fetch = true
            console.log(3)
            setShow_spotlight(false)
        } 
        else{
            let id = window_url.split('/').pop();
            add = '?id=' + id + '&limit=' + limit + '&date=' + now_date
            //show_filter = false
            console.log(4)
            show_fetch = false
            setSpotlight_type('main')
            setShow_spotlight(true)
        }

        //console.log(fetchurl + 'posts' + add + '&date=' + now_date)
        setFetchUrl(fetchurl + 'posts' + add)
        //console.log(fetch_url)
        fetch_url = fetchurl + 'posts' + add
        console.log(fetch_url)

        Get_Posts(fetch_url,setData);
        

    }


    //https://upmostly.com/tutorials/build-an-infinite-scroll-component-in-react-using-react-hooks
    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
    

    function fetchMoreListItems() {
        //hier hol ich mir die neuen daten
        let last_data_item = data.length - 1;
        //console.log(last_data_item)
        //console.log(data[last_data_item])
        //console.log('fetchmore')
        //console.log(fetch_url)
        
        console.log(last_data_item)
        fetch_url=fetch_url.replace(fetch_url.split('=').pop(),data[last_data_item]['created_date'])
        setFetchUrl(fetch_url.replace(fetch_url.split('=').pop(),data[last_data_item]['created_date']))
        
        // console.log('passurl: ' + fetch_url)
        

        Get_Posts(fetch_url,setData,'fetch_more',setIsFetching);

        //setData(prevState => ([...prevState, ...Array.from(Array(2).keys(), n => n + prevState.length + 1)]));
        //setIsFetching(false);
    }   



    useEffect(()=>{
        set_fetch_url(setShow_spotlight,setSpotlight_type,setURLCategory,setCountry,setFetchUrl,Get_Posts,setData,fetchurl)
    },[props.userid,props.show_filter])

    
    useEffect(()=>{
        Get_Posts(fetch_url,setData);
    },[props.comment_update])


    function resetValues(){
        multiselectRef.current.resetSelectedValues();
    }

    

    //if filter adds item
    function onSelect(selectedList, selectedItem){
        let pass = ''
        let selectedcountry = ''
        console.log(selectedList)
        for (let i = 0; i < selectedList.length; i++) {
            //console.log(selectedList[i]['country']);
            selectedcountry = selectedList[i]['country']
            console.log(selectedList)
            pass = pass.concat('category=').concat(selectedcountry).concat('&')
            //console.log(pass);
        }
        fetch_url = fetchurl + 'posts?' + pass.slice(0,-1) + '&limit=' + limit + '&date=' + now_date
        setFetchUrl(fetchurl + 'posts?' + pass.slice(0,-1) + '&limit=' + limit + '&date=' + now_date);
        //console.log(url)
        Get_Posts(fetch_url,setData);
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
        Get_Posts(fetch_url,setData);
        
    };

    //https://stackoverflow.com/questions/57778950/how-to-load-more-search-results-when-scrolling-down-the-page-in-react-js



    return(
        <div class="jumbotron">

            {loading ? (
            <div className="loader-container">
                <img src="../icons/loading.svg"></img>
            </div>
            ) : (
                
                <div>
                    <div classname= "col-1">
                    {props.show_filter &&
                    <Multiselect
                    //customCloseIcon={<>🇪🇺</>}
                    selectedValues={props.selectedValues}
                    classname="countryselect"
                    name="countries"
                    id = "Populate"
                    options={options}
                    onSelect={onSelect}
                    onRemove={onRemove}
                    onChange={setValue}
                    displayValue="country"
                    placeholder="filter content"
                    hidePlaceholder={true}
                    closeOnSelect
                    getOptionLabel={(option) => option.country}
                    getOptionValue={(option) => option.id}
                    style=
                    {
                        {
                            multiselectContainer:{
                            color:"white",
                            "border-radius":"5px"
                            },
                            searchBox: {
                            'border-radius': '0px',
                            "font-size":"16px",
                            height:"40px",
                            padding:"1px",
                            background: "white",
                            "border-radius":"5px"
                            },chips: { // To change css chips(Selected options)
                                background: "#004494",
                                color:"white",
                                "font-size":"16px"
                            },option: { // To change css for dropdown options
                                color: "#004494",
                                background:"white",
                                "font-size":"16px"
                            }
                        }
                    }
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

                data && data.length>0 && data.map((item)=>
                    (
                        <div>
                        {imageExists(item.content) &&

                        <SinglePost 
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
                            set_saved_MongoPostID={props.set_saved_MongoPostID}
                            saved_MongoPostID={props.saved_MongoPostID}
                        />
                        }
                        </div>
                    )
                    
                )
            }
            {show_fetch && 
            <div id="fetch_button_container"> 
                <button type='button' onClick={fetchMoreListItems} id="fetch_button" class="btn">fetch more...</button>   
            </div>
            }
            </div>
        )}
        
    </div>
    );
}