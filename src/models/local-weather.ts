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

    constructor(args: ILocalWeather) {
        /** TODO: These may not be deep copies; these may not be immutable */
        ({
            lat: this.lat,
            lon: this.lon,
            timezone: this.timezone,
            timezone_offset: this.timezone_offset,
            current: this.current,
            hourly: this.hourly,
            daily: this.daily,
        } = args);

        /** Since this object is immutable, this value will not change */
        this.latlon = new LatLon(this);
    }
}