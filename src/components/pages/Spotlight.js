



function Spotlight({type,category,selected_country}){


    //https://gist.github.com/pianosnake/b4a45ef6bdf2ffb2e1b44bbcca107298    
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

        
    function return_div(passed_url){
        return (
            <div>
            
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
            src={passed_url} />


            </div>
        )
    }

    let iframe_url = ''
    let latitude = ''
    let longitude = ''
    let height = '450px'
    let divver;

    if(type == 'category'){
        latitude = selected_country[0].coordinates.latitude
        longitude = selected_country[0].coordinates.longitude
        let bbox = latLngToBounds(latitude,longitude,7,400,400)

        let south = Number(latitude) - 1.5;
        let north = Number(latitude) + 1.5;
        let west = Number(longitude) - 1.5;
        let east = Number(longitude) + 1.5;
        
        //console.log('lat:' + latitude + ' lng:' + longitude + ' south: ' + south + ' north : ' + north 
         //   + ' west: ' + west + ' east: ' + east)

        iframe_url = 'https://www.openstreetmap.org/export/embed.html?bbox=' +west+'%2C'+south+'%2C'+east+'%2C'+north+'&amp;layer=mapnik'
        //iframe_url = "https://www.openstreetmap.org/export/embed.html?bbox=11.700439453125%2C42.13082130188811%2C19.489746093750004%2C48.857487002645485&amp;layer=mapnik"
        //console.log(iframe_url)
        height = '300px'

        divver = return_div(iframe_url)


    }else if(type == 'user'){

        iframe_url = 'https://deepstatemap.live/en#6/48.129/36.953'

        divver = return_div(iframe_url)

    }else{
        category = 'urkaine'
        
        iframe_url = 'https://deepstatemap.live/en#6/48.129/36.953'

        divver = return_div(iframe_url)

    }

//<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=-4.174804687500001%2C38.25543637637949%2C3.7133789062500004%2C51.754240074033525&amp;layer=mapnik" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/#map=6/45.406/-0.231">View Larger Map</a></small>

    return(
        <section>
            <div className= "container">
                {divver}
            </div>

        </section>
    );
}

export default Spotlight;