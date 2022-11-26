
import {useState, useEffect} from "react";


export default function Upload_Image({files,setFiles,setNowpost,setImage,upload,start_upload}) {
  
  
  function select_image(selected_file) {
    let selected_files = selected_file.target.files
    selected_file.preventDefault();
    console.log(selected_files)
    setFiles(selected_files);    
  }


  useEffect(() => {
    if (upload === true && files.length > 0) {
      console.log('upload')
      readAndUpload();
    }
  }, [upload]);




    function readAndUpload( ) {
    const image = files[0];
    let formData = new FormData();
    formData.append('image',image)
    const params = new URLSearchParams();
    params.set('name', image.name);
    params.set('size', image.size);
    //const url = process.env.REACT_APP_IMAGESERVER_URL + 'images?'+params.toString();
    const url = process.env.REACT_APP_IMAGESERVER_URL + 'images';
    
    fetch(url, 
      {
          method: 'POST',
          //headers: headers,
          body: formData
      }).then(response => response.json())
      .then(data => {
            console.log(data)
            start_upload(false);
            setFiles([]);
            setImage([]);
            setNowpost(image.name);
      });
  }


  return (
    <div>
        <div class="image-upload">
            <label for="file-input">
            <img id="upload_img"  src="./upload.png"  alt="upload img"/>
            </label>
            <input id="file-input" name='file' type="file" accept="image/*" onChange={(file)=>{select_image(file)}}/>
        </div>
    </div>
  );
}

