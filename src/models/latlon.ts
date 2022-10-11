import ILatLon from "../types/latlon";

export default class LatLon implements ILatLon {

    lat: number;
    lon: number;

    constructor(args: ILatLon) {
        ({
            lat: this.lat,
            lon: this.lon,
        } = args);
    }

    static equals(a: ILatLon, b: ILatLon) {
        return a.lat === b.lat && a.lon === b.lon;
    }

    /**
     * Only checks to make sure that the properties lat and lon exist
     * 
     * @params other: LatLon, the other LatLon object to check with
     */
    isSame(other: ILatLon) {
        return LatLon.equals(this, other);
    }
}