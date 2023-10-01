async function getPosts(pass_url, setData, fetchtype, setIsFetching) {
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

        if (fetchtype) {
            setData(prevState => ([...prevState, ...myJson.posts]));
            setIsFetching(false);
            
            console.log('######## fetching...');
        } else {
            console.log('######## dataget...');
            setData(myJson.posts);
        }

    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

export default getPosts;
