const fetchImfData = async (topic, country) => {
    console.log('arrive here')
    console.log(topic,country)

    const fetchurl = process.env.REACT_APP_DATASERVER_URL
    try {
        console.log()
        const uri = fetchurl + `/fetch-data?topic=${topic}&country=${country}`;
        const response = await fetch(uri);
        const data = await response.json();
        return data;

      } catch (error) {
        console.error('Error fetching data:', error);
      }
  };

export default fetchImfData;