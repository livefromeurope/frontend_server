

function Bbox(lat,lng,zoom, width,height) {

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

    return latLngToBounds(lat,lng,zoom, width,height)

}

export default Bbox