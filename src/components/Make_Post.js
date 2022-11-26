

async function Make_Post(content,category,username,image){
    
        //console.log(value_dd);
        let created_date = new Date().toISOString()
        console.log(created_date)
        console.log(content)
        console.log(category)
        
        let fetchurl = process.env.REACT_APP_POSTSERVER_URL + 'posts'
        let randomstring = Math.random().toString(36).slice(-15);
        if(content && category){
            console.log(content);
            let body_json = 
            {
                'title': content,
                'id': String(randomstring),
                'category': String(category),
                'author': username,
                'content': content,
                'image': image,
                'comment_count':0,
                'votes':0,
                'created_date': created_date
            }
            await fetch(fetchurl, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body_json)
            })  .then(response => response.json())
                .then(data => console.log(data));
        }else{
            console.log("PFLICHTFELD")
        }
        

}


export default Make_Post