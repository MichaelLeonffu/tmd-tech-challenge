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
        /** I don't like this fix but I didn't realize that using latLon as IDs is a bad idea
         * There is a lot of decimal precision and so whenever the user would want to compare data,
         * it could think that a location is different even if its in the same area.
         * If somebody were to be between whats (.00) of a degree then there may be issues; but it's
         * roughly 1km?
         */
        return a.lat.toFixed(3) === b.lat.toFixed(3) && a.lon.toFixed(3) === b.lon.toFixed(3);
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