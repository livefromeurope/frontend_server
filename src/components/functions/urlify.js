import React from 'react';

function extractDomain(url) {
    let domain;
    // Find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    } else {
        domain = url.split('/')[0];
    }
    // Find & remove port number
    domain = domain.split(':')[0];
    return domain;
}

function Urlify(text) {
    var regex = (/(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))/i);

    text = text.replace('<', '').replace('>', '');
    let imgurl = regex.exec(text);


    const linkStyle = {
        color: '#004494',  // European Union blue
        textDecoration: 'none'  // Optional, if you want to remove the underline from links
    };

    if (imgurl == null) {
        let youtube_url = text.match(/(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)\/(watch)?(\?v=)?(\S+)?/);

        if (youtube_url == null) {
            let link = text.match(/(http:|https:)?\/\/(www\.)?(\?v=)?(\S+)?/);

            if (link == null) {
                return text;
            } else {
                let link_url = link[0];
                let domainName = extractDomain(link_url);
                return (
                    <div className="singlepost_text">
                        {text.replace(link_url, '')}
                        <p>
                            <a href={link_url} target="_blank" style={linkStyle}>
                                Link to {domainName}
                            </a>
                        </p>
                    </div>
                );            }
        } else {
            let youtube_id = youtube_url[0].split('/').pop();
            youtube_id = youtube_id.replace('watch?v=', '');
            let imgurl_youtube = 'https://i.ytimg.com/vi/' + String(youtube_id) + '/hqdefault.jpg';
            youtube_url = youtube_url[0];
            return <div>{text} <a href={youtube_url} target="_blank"><img src={imgurl_youtube} /></a> </div>;
        }
    } else {
        let new_text = text.replace(imgurl[0], "");
        let link = new_text.match(/(http:|https:)?\/\/(www\.)?(\?v=)?(\S+)?/);
        if (link == null) {
            return <div className="singlepost_container"><div className="singlepost_text">{new_text}</div> <div className="singlepost_img"><img src={imgurl[0]} loading="lazy" /></div></div>;
        } else {
            let domainName = extractDomain(link[0]);
            return (
                <div className="singlepost_container">
                    <a href={link[0]} target="_blank" style={linkStyle}>
                        <div className="singlepost_text">
                            Link to {domainName} {new_text.replace(link[0], '')}
                        </div>
                        <div className="singlepost_img">
                            <img src={imgurl[0]} loading="lazy" />
                        </div>
                    </a>
                </div>
            );        }
    }
}

export default Urlify;
