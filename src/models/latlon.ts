import ILatLon from "../types/latlon";
// import AppStore from "../stores/app";

export default class LatLon implements ILatLon {

    lat: number;
    lon: number;

    constructor (lat: number, lon: number) {
        this.lat = lat;
        this.lon = lon;
    }
}