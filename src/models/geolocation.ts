import IGeoLocation from "../types/geolocation";
import ILatLon from "../types/latlon";
import LatLon from "./latlon";

export default class Geolocation implements IGeoLocation {

    latlon: LatLon;

    /** There should be a better way to do this! So much duplicated code */
    name: string;
    local_names: string[];
    lat: ILatLon['lat'];
    lon: ILatLon['lon'];
    country: string;
    state: string;

    constructor(args: IGeoLocation) {
        /** TODO: These may not be deep copies; these may not be immutable */
        ({
            name: this.name,
            local_names: this.local_names,
            lat: this.lat,
            lon: this.lon,
            country: this.country,
            state: this.state,
        } = args);

        /** Since this object is immutable, this value will not change */
        this.latlon = new LatLon(this);
    }
}