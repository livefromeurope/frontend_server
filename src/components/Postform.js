import React, {useRef , useState, useEffect} from 'react';
import Multiselect from 'multiselect-react-dropdown';
import Make_Post from './Make_Post';
//import Upload_Image from './Upload_Image';
//https://www.npmjs.com/package/react-textarea-autosize
import TextareaAutosize from 'react-textarea-autosize';
import Upload_Image from './Upload_Image';
import useAuth from './useAuth';
import europe_countries from './europe_countries.json'



function Postform({Update_Trigger}){
    let options = europe_countries
    const [value_dd, setValue] = React.useState({});
    const [textdata,setTextData]=useState('');
    const Textarea = useRef();
    const multiselectRef = React.createRef();
    const [nowpost,setNowpost]=useState('');
    const [selected_country,set_selected_country]=useState('');
    const {auth} = useAuth();
    //imageupload
    const [files, setFiles] = useState([]);
    const [image,setImage]=useState([]);
    const [upload,start_upload]=useState(false);
    const [show,set_show]=useState(false);

    //https://dev.to/przpiw/file-upload-with-react-nodejs-2ho7
    
    function onSelect(selectedList, selectedItem){
        for (let i = 0; i < selectedList.length; i++) {
            set_selected_country(selectedList[i]['country'])
            //console.log(selectedList);
        }
    };
    
    function onRemove(selectedList, removedItem){
        for (let i = 0; i < selectedList.length; i++) {
            set_selected_country('')
            //console.log(selectedList);
        }
    };

    function resetValues(){
        multiselectRef.current.resetSelectedValues();
    };

    function resetTextarea(){
        setTextData('')
    };


    useEffect(() => {
        if (files.length > 0) {
            set_show(true)
            let reader = new FileReader();
            let imagefile = files[0]
            let imagename = imagefile.name
            let imagesize = imagefile.size/1000
            reader.onloadend = () => {
                setImage({
                    imageFile: imagefile,
                    imagePreviewUrl: reader.result,
                    imageName: imagename,
                    imageSize: imagesize
            });          
        }
            reader.readAsDataURL(imagefile)
        
        }else{
            set_show(false)
        }
    }, [files]);


    function Upload_Or_Post(){
        if (files.length > 0) {
            
            start_upload(true)
            
        }else{
            Upload_And_Post()
        }
    }

    function Upload_And_Post(){
            let text_and_image = ''
            let imageurl = ''
            if(nowpost != ''){
                imageurl=process.env.REACT_APP_FRONTEND_URL +'images/'+nowpost
                text_and_image =  textdata + ' ' + imageurl
                
            }else{
                text_and_image =  textdata 
            }
            console.log(text_and_image)
            Make_Post(text_and_image,selected_country,auth.username,imageurl)
            resetValues();
            resetTextarea();
            Update_Trigger(textdata);
            setNowpost('')
    }


    useEffect(() => {
            Upload_And_Post()
    }, [nowpost]);


    return(
        <section>
                
                <div class= "Postform">
                
                    <form>
                        <div class="form-group">
                        <div>
                                
                            <TextareaAutosize 
                                maxRows="3"
                                minRows="1"
                                onChange={ (e) => setTextData(e.target.value)}
                                value={textdata}
                                placeholder={'input'}
                                id={'Textarea'}
                                className={'form-control'}
                                readOnly={upload}
                            />
                            </div>
                            <div className="img-preview">
                                {show && <img src={image.imagePreviewUrl}></img>}
                                <label>{image.imageName}</label>
                                <label>{image.imageSize}</label>
                            </div>
                            <div class="row mb-4 flex-nowrap" id="form-row">
                                <div class="col-8">
                                    <div class="row">
                                        <div class="col-12">
                                            <Multiselect
                                            //customCloseIcon={<>🇪🇺</>}
                                            classname="countryselect"
                                            name="countries"
                                            id = "Populate"
                                            options={options}
                                            onSelect={onSelect}
                                            onRemove={onRemove}
                                            value={value_dd}
                                            displayValue="country"
                                            placeholder = "select country"
                                            closeOnSelect={true}
                                            selectionLimit={1}
                                            //singleSelect={true}
                                            ref={multiselectRef}
                                            getOptionLabel={(option) => option.country}
                                            getOptionValue={(option) => option.id}
                                            style={
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
                                        </div>
                                    </div>
                                </div>
                                <div class = "col" >
                                    <div id='form_button_container'>
                                        <div id='form_buttons'>
                                            <div class="row mb-4 flex-nowrap" >
                                                <div class="col-3"> 
                                                    <Upload_Image
                                                        files={files}
                                                        setFiles={setFiles}
                                                        image={image}
                                                        setImage={setImage}
                                                        upload={upload}
                                                        start_upload={start_upload}
                                                        setNowpost={setNowpost}
                                                    />
                                                </div>
                                                <div class="col-3" id="post-btn">
                                                        <button type='button' onClick={()=>(Upload_Or_Post())} id="" class="btn btn-md btn-outline btn-primary"> post</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
        </section>
    );

}

export default Postform;