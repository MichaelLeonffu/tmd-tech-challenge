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
}