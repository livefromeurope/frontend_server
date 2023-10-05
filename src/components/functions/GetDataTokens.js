



async function getPostTokens(pass_url) {
    
    try {
        console.log(pass_url)
        const response = await fetch(pass_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Check if the response is okay
        if (!response.ok) {
            console.error(`Server responded with ${response.status}: ${response.statusText}`);
            return;
        }

        const myJson = await response.json();


        console.log(myJson.posts);
        

    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

let REACT_APP_POSTSERVER_URL="http://localhost:9000/"
let now_date = new Date().toISOString()
let fetchurl = REACT_APP_POSTSERVER_URL
let add = 'posts?limit=100'+ '&date=' + now_date
let geturl = fetchurl + add
console.log(geturl)
getPostTokens(geturl)