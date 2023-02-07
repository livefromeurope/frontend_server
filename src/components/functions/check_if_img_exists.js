export default async function imageExists(image_url){

    let link = image_url.match(/(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))/);

    fetch(link[0],{
        method: 'HEAD'
    }
    ).then(function(response){
        
        //console.log(response)
        if(response.status == 200){
            
            return true;

        }else{
            
            console.log(link[0])
            return false;

        }

    })


}

