import ILatLon from "./latlon";

export default interface IGeoLocation {

    /** Not sure if this is the best way to do this... */
    name: string,
    local_names: string[],
    lat: ILatLon['lat'],
    lon: ILatLon['lon'],
    country: string,
    state: string,

}