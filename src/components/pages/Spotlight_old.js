import React from 'react';
import GraphWidget from '../functions/GraphWidget';
import european_countries from '../europe_countries.json';

function Spotlight({type, category, selected_country}) {
    console.log(selected_country);

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

    let iframe_url = '';
    let latitude = '';
    let longitude = '';
    let height = '450px';

    // Conditional logic to determine iframe_url and other variables based on type
    if (type === 'category') {
        try {
            latitude = selected_country[0].coordinates.latitude;
            longitude = selected_country[0].coordinates.longitude;
            let bbox = latLngToBounds(latitude, longitude, 7, 400, 400);

            let south = Number(latitude) - 3;
            let north = Number(latitude) + 3;
            let west = Number(longitude) - 3;
            let east = Number(longitude) + 3;

            iframe_url = `https://www.openstreetmap.org/export/embed.html?bbox=${west}%2C${south}%2C${east}%2C${north}&amp;layer=mapnik`;
            height = '300px';
        } catch {
            iframe_url = 'https://deepstatemap.live/en#6/48.129/36.953';
        }
    } else if (type === 'user') {
        iframe_url = 'https://deepstatemap.live/en#6/48.129/36.953';
    } else {
        category = 'RIOT ORBAN';
        iframe_url = "../merch/front_new.png";
    }

    let isoCode = getIsoCodeByCountryName(category);

    // Return different HTML based on the type
    return (
        <section>
            <div className="container">
                <div>Spotlight: {category}</div>

                {type === 'category' && (
                    <iframe
                        style={{
                            width: '100%',
                            height: height,
                            borderRadius: "20px",
                            border: "solid",
                            borderBottomColor: "#ffd700",
                            borderLeftColor: "#ffd700",
                            borderTopColor: "#0057B7",
                            borderRightColor: "#0057B7",
                        }}
                        src={iframe_url}
                    />
                )}

                {type === 'user' && (
                    <iframe
                        style={{
                            width: '100%',
                            height: height,
                            borderRadius: "20px",
                            border: "solid",
                            borderBottomColor: "#ffd700",
                            borderLeftColor: "#ffd700",
                            borderTopColor: "#0057B7",
                            borderRightColor: "#0057B7",
                        }}
                        src={iframe_url}
                    />
                )}

                {type !== 'category' && type !== 'user' && (
                    <div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <img 
                            src="../merch/diversity.jpg"
                            alt="Video 1"
                            style={{
                                width: "100%",
                                borderRadius: "20px",
                                border: "solid",
                                borderBottomColor: "#ffd700",
                                borderLeftColor: "#ffd700",
                                borderTopColor: "#0057B7",
                                borderRightColor: "#0057B7",
                            }}
                        />
                        <div style={{ textAlign: 'center','font-size':'11px' }}>flowers</div>
                    </div>
                    <div>
                        <img 
                            src="../merch/lazadas.jpg"
                            alt="Video 2"
                            style={{
                                width: "98%",
                                borderRadius: "20px",
                                border: "solid",
                                borderBottomColor: "#ffd700",
                                borderLeftColor: "#ffd700",
                                borderTopColor: "#0057B7",
                                borderRightColor: "#0057B7",
                            }}
                        />
                        <div style={{ textAlign: 'center', 'font-size':'11px' }}>riot</div>
                    </div>
                </div>
                    
                        <a href="https://www.livefromeurope.eu/merch" target="_blank" style={{ display: 'block', marginTop: '10px', textAlign: 'center' }}>
                        Visit Our Merch Store
                        </a>
                </div>
                    
                )}


                {/* Uncomment to use the GraphWidget */}
                {/*<GraphWidget initialCountry={isoCode} />*/}
            </div>
        </section>
    );
}

export default Spotlight;
