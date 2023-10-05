async function Get_UserData(passurl, setUserdata) {
    console.log("get data from: " + passurl);
    try {
        const response = await fetch(passurl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const myJson = await response.json();
        setUserdata(myJson);
        console.log('pass');
    } catch (error) {
        console.error("Failed to fetch data:", error);
        // You can set some default data or handle the error in another way here
        // For example:
        // setUserdata(defaultData);
    }
}

export default Get_UserData;
