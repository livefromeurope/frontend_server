function imageExists(image_url){

    let link = image_url.match(/(http:|https:)?\/\/(www\.)?(\?v=)?(\S+)?/);

    var http = new XMLHttpRequest();
    //console.log(link[0]);
    console.log('https://i.redd.it/5p5jrtv7lmda1.jpg')
    http.open('HEAD', link[0], false);
    http.send();

    return http.status != 404;

}

export default imageExists;
