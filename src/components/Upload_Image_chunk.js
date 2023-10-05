
import {useState, useEffect} from "react";


//export default function Upload_Image({files,setFiles,setNowpost,setImage,upload,start_upload,upload_percentage,set_upload_percentage}) {
export default function Upload_Image({files,setFiles,setNowpost,setImage,upload,start_upload}) {

  const chunkSize = 10 * 1024;
  //const chunkSize = 10 * 4096;
  //const [files, setFiles] = useState([]);
  //const [image,setImage]=useState([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(null);
  const [retry, setretry] = useState('');
  function select_image(selected_file) {
    let selected_files = selected_file.target.files
    selected_file.preventDefault();
    console.log(selected_files)
    setFiles(selected_files);    
  }


  useEffect(() => {
    if (currentChunkIndex !== null) {
      readAndUploadCurrentChunk();
    }
  }, [currentChunkIndex],[retry]);


  useEffect(() => {
    if (upload === true && files.length > 0) {
      console.log('upload')
      setCurrentChunkIndex(0);
      //readAndUploadCurrentChunk();
    }
  }, [upload]);


  function readAndUploadCurrentChunk() {
    const reader = new FileReader();
    const file = files[0];
    const from = currentChunkIndex * chunkSize;
    const to = from + chunkSize;
    const blob = file.slice(from, to);
    reader.onload = e => uploadChunk(e);
    reader.readAsArrayBuffer(blob);  // Change to readAsArrayBuffer
  }


  function uploadChunk(readerEvent) {
    const file = files[0];
    const data = readerEvent.target.result;  // This will now be an ArrayBuffer
    const params = new URLSearchParams();
    params.set('name', file.name);
    params.set('size', file.size);
    params.set('currentChunkIndex', currentChunkIndex);
    params.set('totalChunks', Math.ceil(file.size / chunkSize));
    //set_upload_percentage(Math.round((currentChunkIndex/Math.ceil(file.size / chunkSize))*100))
    const headers = {'Content-Type': 'application/octet-stream'};
    const url = process.env.REACT_APP_IMAGESERVER_URL + 'images?' + params.toString();

    fetch(url, 
      {
          method: 'POST',
          headers: headers,
          body: data  // Send the raw binary data directly
      }).then(response => response.json())
      .then(data => {
        console.log(data)
        const file = files[0];
        const filesize = files[0].size;
        const chunks = Math.ceil(filesize / chunkSize) - 1;
        const isLastChunk = currentChunkIndex === chunks;
        if(data === 200 || data.finalFilename){
            console.log('currentchunk: ' + currentChunkIndex + ' ' + chunks +'is 200')
          if (isLastChunk) {
            console.log('LAST')
            console.log(file.name)
            file.finalFilename = 'ok';
            console.log(data.finalFilename)
            setCurrentChunkIndex(null);
            start_upload(false);
            //set_upload_percentage(0);
            setFiles([]);
            setImage([]);
            setNowpost(data.finalFilename);
          } else {
            setCurrentChunkIndex(currentChunkIndex + 1);
          }
        }
        else{
          console.log('RETRY1')
          setretry(currentChunkIndex);
        }
      
      });
  }


  return (
    <div>
        <div className="image-upload">
            <label for="file-input">
            <img id="upload_img"  src="./upload.png"  alt="upload img"/>
            </label>
            <input id="file-input" name='file' type="file" accept="image/*" onChange={(file)=>{select_image(file)}}/>
        </div>
    </div>
  );
}

