import React, {useState, useEffect } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import useInfiniteScroll from "./useInfiniteScroll";
import SinglePost from "./SinglePost";
import Get_Posts from './Get_Posts';
import europe_countries from './europe_countries.json'
import Urlify from './Urlify';



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

    //const [saved_MongoPostID,set_saved_MongoPostID] = useState('');

    let now_date = new Date().toISOString()
    let url = window.location.href;



    if(!url.includes('www') && !url.includes('localhost')){
        url = url.replace('https://','https://www.' )
        console.log('replaced:' + url)
    }
    
    //setUrl(window.location.href)
    //////////////////stillllllll testing //// alternative = posts copy.js

    let limit = 15
    //let show_filter = true
    
    let show_fetch = true
    let show_spotlight = true
    var add = ''

    //let baseurl = 'http://localhost:3000/'
    //let fetchurl = 'http://127.0.0.1:9000/'
    let fetchurl = process.env.REACT_APP_POSTSERVER_URL
    let baseurl = process.env.REACT_APP_FRONTEND_URL


    if(url === baseurl){
        add = '?limit=' + limit
        //show_filter = false
        show_fetch = true
        show_spotlight = true
    }else if(url.match(baseurl+'category/*')){
        var category = url.split('/').pop();
        add = '?category=' + category + '&limit=' + limit
        //show_filter = false
        show_fetch = true
        show_spotlight = false
    }else if(url.match(baseurl+'user/*')){
        var category = url.split('/').pop();
        add = '?author=' + category + '&limit=' + limit
        //show_filter = false
        show_fetch = true
        show_spotlight = false
    }else if(url.match(baseurl+'profile/*')){
        var category = url.split('/').pop();
        add = '?author=' + category + '&limit=' + limit
        //show_filter = false
        show_fetch = true
        show_spotlight = false
    } 
    else{
        var id = url.split('/').pop();
        add = '?id=' + id + '&limit=' + limit
        //show_filter = false
        show_fetch = false
        show_spotlight = true
    }


    //https://upmostly.com/tutorials/build-an-infinite-scroll-component-in-react-using-react-hooks
    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
    

    function fetchMoreListItems() {
        //hier hol ich mir die neuen daten
        let last_data_item = data.length - 1;
        //console.log(last_data_item)
        //console.log(data[last_data_item])
        //console.log('fetchmore')
        //console.log(url)
        url = url.replace(url.split('=').pop(),data[last_data_item]['created_date'])
        //console.log(url)
        
        Get_Posts(url,setData,'fetch_more',setIsFetching);

        //setData(prevState => ([...prevState, ...Array.from(Array(2).keys(), n => n + prevState.length + 1)]));
        //setIsFetching(false);
    }   


    //var add = '?_id:ObjectId("6263edf28e66ce4e13d67950")'
    url = fetchurl + 'posts' + add + '&date=' + now_date;
    //console.log('Fetchurl: ' + url)

    useEffect(()=>{
        Get_Posts(url,setData);
    },[props.comment_update,vote_update])


    function resetValues(){
        multiselectRef.current.resetSelectedValues();
    }

    

    //if filter adds item
    function onSelect(selectedList, selectedItem){
        let pass = ''
        let selectedcountry = ''
        for (let i = 0; i < selectedList.length; i++) {
            //console.log(selectedList[i]['country']);
            selectedcountry = selectedList[i]['country']
            console.log(selectedList)
            pass = pass.concat('category=').concat(selectedcountry).concat('&')
            //console.log(pass);
        }
        url = fetchurl + 'posts?' + pass.slice(0,-1) + '&limit=' + limit + '&date=' + now_date;
        //console.log(url)
        Get_Posts(url,setData);
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
        url = fetchurl + 'posts?' + pass.slice(0,-1) + '&limit=' + limit + '&date=' + now_date;
        

        Get_Posts(url,setData);
        
    };

    //https://stackoverflow.com/questions/57778950/how-to-load-more-search-results-when-scrolling-down-the-page-in-react-js

    return(
        <div class="jumbotron">
                <div classname= "col-1">
                    {props.show_filter &&
                    <Multiselect
                    //customCloseIcon={<>🇪🇺</>}
                    classname="countryselect"
                    name="countries"
                    id = "Populate"
                    options={options}
                    onSelect={onSelect}
                    onRemove={onRemove}
                    onChange={setValue}
                    displayValue="country"
                    placeholder="filter content"
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
            {show_spotlight  && <div className='Spotlight'>
            spotlight post: ukraine war
                <div>
                    <iframe  width="100%" height="400" src="https://deepstatemap.live/en#7/47.953/36.041" >
                    </iframe>    
                </div>
            </div>
            }
            {
                data && data.length>0 && data.map((item)=>
                    (
                    //console.log(test1),
                    //props.setpostData({item}),
                    <SinglePost 
                        post_id={item.id}
                        post_info={PostInfo}
                        set_post_info={setPostInfo}
                        post_author={item.author}
                        post_content={Urlify(item.content)}
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
                    )
                )
            }
            {show_fetch && 
            <div id="fetch_button_container"> 
                <button type='button' onClick={fetchMoreListItems} id="fetch_button" class="btn">fetch more...</button>   
            </div>
            }
    </div>
    );
}