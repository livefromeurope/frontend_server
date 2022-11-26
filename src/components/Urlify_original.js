function Urlify(text) {
    var regex = (/(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))/i);
    let imgurl = regex.exec(text);
    if(imgurl == null){
        let youtube_url = text.match(/(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)\/(watch)?(\?v=)?(\S+)?/);
            if(youtube_url == null){
            
                return text 

            }else{
                let youtube_id = youtube_url[0].split('/').pop();
                youtube_id = youtube_id.replace('watch?v=','');

                let imgurl_youtube = 'https://i.ytimg.com/vi/' + String(youtube_id) + '/hqdefault.jpg'
                youtube_url = youtube_url[0]
                return <div>{text} <a href={youtube_url} target="_blank"><img src={imgurl_youtube} /> </a> </div> 

            }
    }        
    else{
        //return <div>{text.replace(imgurl[0],"")} <img src = {imgurl[0]} loading='lazy' /></div>
        return <div class="singlepost_container"><div class="singlepost_text">{text.replace(imgurl[0],"")}</div> <div class="singlepost_img"><img src = {imgurl[0]} loading='lazy' /></div></div>
    }
    
};

export default Urlify;