import ILocalWeather from "../types/local-weather";
import ILatLon from "../types/latlon";
import LatLon from "./latlon";

export default class LocalWeather implements ILocalWeather {

    latlon: LatLon;

    /** There should be a better way to do this! So much duplicated code */
    lat: ILatLon['lat'];
    lon: ILatLon['lon'];
    timezone: string;
    timezone_offset: number;
    current: ILocalWeather['current'];
    hourly: ILocalWeather['hourly'];
    daily: ILocalWeather['daily'];

    constructor (
        lat: ILatLon['lat'],
        lon: ILatLon['lon'],
        timezone: string,
        timezone_offset: number,
        current: ILocalWeather['current'],
        hourly: ILocalWeather['hourly'],
        daily: ILocalWeather['daily'],
    ) {
        /** TODO: These may not be deep copies; these may not be immutable */
        this.lat = lat;
        this.lon = lon;
        this.timezone = timezone;
        this.timezone_offset = timezone_offset;
        this.current = current;
        this.hourly = hourly;
        this.daily = daily;

        /** Since this object is immutable, this value will not change */
        this.latlon = new LatLon(this.lat, this.lon);
    }
}