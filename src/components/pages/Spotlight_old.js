import GraphWidget from '../functions/GraphWidget';
import european_countries from '../europe_countries.json';

function Spotlight({type,category,selected_country}){
    console.log(selected_country)

    const EARTH_CIR_METERS = 40075016.686;
    const degreesPerMeter = 360 / EARTH_CIR_METERS;

    function toRadians(degrees) {
        return degrees * Math.PI / 180;
    };

    function latLngToBounds(lat, lng, zoom, width, height){
        const metersPerPixelEW = EARTH_CIR_METERS / Math.pow(2, zoom + 8);
        const metersPerPixelNS = EARTH_CIR_METERS / Math.pow(2, zoom + 8) * Math.cos(toRadians(lat));

        const shiftMetersEW = width/2 * metersPerPixelEW;
        const shiftMetersNS = height/2 * metersPerPixelNS;

        const shiftDegreesEW = shiftMetersEW * degreesPerMeter;
        const shiftDegreesNS = shiftMetersNS * degreesPerMeter;

        // [[south, west], [north, east]]
        return [[lat-shiftDegreesNS, lng-shiftDegreesEW], [lat+shiftDegreesNS, lng+shiftDegreesEW]];
    }
    //

    // Function to get ISO code by country name
    function getIsoCodeByCountryName(countryName) {
        // Normalize the country name to ensure case-insensitive matching
        const normalizedCountryName = countryName.toLowerCase();
    
        // Find the country object
        const countryObject = european_countries.find(
        country => country.country.toLowerCase() === normalizedCountryName
        );
    
        // Return the ISO code or null if not found
        return countryObject ? countryObject.isocode : null;
    }
    
    // Example usage:
    let isoCode = getIsoCodeByCountryName(category);

    let iframe_url = ''
    let latitude = ''
    let longitude = ''
    let height = '450px'

    if(type == 'category'){
        try{
            latitude = selected_country[0].coordinates.latitude
            longitude = selected_country[0].coordinates.longitude
            let bbox = latLngToBounds(latitude,longitude,7,400,400)

            let south = Number(latitude) - 3;
            let north = Number(latitude) + 3;
            let west = Number(longitude) - 3;
            let east = Number(longitude) + 3;
            
            //console.log('lat:' + latitude + ' lng:' + longitude + ' south: ' + south + ' north : ' + north 
            //   + ' west: ' + west + ' east: ' + east)

            iframe_url = 'https://www.openstreetmap.org/export/embed.html?bbox=' +west+'%2C'+south+'%2C'+east+'%2C'+north+'&amp;layer=mapnik'
            //iframe_url = "https://www.openstreetmap.org/export/embed.html?bbox=11.700439453125%2C42.13082130188811%2C19.489746093750004%2C48.857487002645485&amp;layer=mapnik"
            //console.log(iframe_url)
            height = '300px'
        }catch{
            iframe_url = 'https://deepstatemap.live/en#6/48.129/36.953'

        }
    }else if(type == 'user'){

        iframe_url = 'https://deepstatemap.live/en#6/48.129/36.953'

    }else{
        category = 'urkaine'
        
        iframe_url = 'https://deepstatemap.live/en#6/48.129/36.953'
    }

//<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=-4.174804687500001%2C38.25543637637949%2C3.7133789062500004%2C51.754240074033525&amp;layer=mapnik" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/#map=6/45.406/-0.231">View Larger Map</a></small>

    return(
        <section>
            <div className= "container">
                spotlight: {category}

                <iframe 
                style={{
                    width: '100%',height:height, "borderRadius":"20px", 
                    border:"solid", 
                    "borderBottomColor":"#ffd700",
                    "borderLeftColor":"#ffd700",
                    "borderTopColor":"#0057B7",
                    "borderRightColor":"#0057B7",
                    }} 
                src={iframe_url} />
                <GraphWidget initialCountry={isoCode}/>

            </div>
        </section>
    );
}

export default Spotlight;