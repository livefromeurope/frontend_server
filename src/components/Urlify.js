function Urlify(text) {
    var regex = (/(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))/i);
    let imgurl = regex.exec(text);
    if(imgurl == null){
        let youtube_url = text.match(/(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)\/(watch)?(\?v=)?(\S+)?/);
            
            if(youtube_url == null){
                let link = text.match(/(http:|https:)?\/\/(www\.)?(\?v=)?(\S+)?/);

                if(
                    link == null
                ){
                    return text 
                }

                else{
                    let link_url = link[0]
                    return <div class="singlepost_text"><a href={link_url} target="_blank">{text.replace(link_url,'')}</a></div>
                }
            
            }else{
                let youtube_id = youtube_url[0].split('/').pop();
                youtube_id = youtube_id.replace('watch?v=','');

                let imgurl_youtube = 'https://i.ytimg.com/vi/' + String(youtube_id) + '/hqdefault.jpg'
                youtube_url = youtube_url[0]
                return <div>{text} <a href={youtube_url} target="_blank"><img src={imgurl_youtube} /> </a> </div>

            }
    }        
    else{
        let new_text = text.replace(imgurl[0],"")
        let link = new_text.match(/(http:|https:)?\/\/(www\.)?(\?v=)?(\S+)?/);
        if(
            link == null
        ){
            return <div class="singlepost_container"><div class="singlepost_text">{new_text}</div> <div class="singlepost_img"><img src = {imgurl[0]} loading="lazy" /></div></div>
        }else{
        return <div class="singlepost_container"><a href={link[0]} target="_blank"><div class="singlepost_text">{new_text.replace(link[0],'')}</div> <div class="singlepost_img"><img src = {imgurl[0]} loading="lazy" /></div></a></div>
        
    }
    }
    
}

export default Urlify