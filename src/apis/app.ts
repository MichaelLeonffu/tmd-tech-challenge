import axios from "axios";
import IGeoLocation from "../types/geolocation";
import ILatLon from "../types/latlon";
import ILocalWeather from "../types/local-weather";

export default class AppApi {

    /** Setup the client, later anything can use this setup to make queries to the API server */
    client = axios.create({
        baseURL: "/api/openweatherapi",
        timeout: 10000,
        params: {
            exclude: "alert,minutely",
        },
    });

    async getLocalWeather(latLon: ILatLon): Promise<ILocalWeather> {
        const res = await this.client.get('/data/3.0/onecall', {
            params: {
                /** TODO: should these be strings? */
                lat: latLon.lat,
                lon: latLon.lon,
                units: "imperial",
            }
        });
        return res.data;
    }

    async getGeolocationFromLatLon(latLon: ILatLon): Promise<IGeoLocation> {
        const res = await this.client.get('/geo/1.0/reverse', {
            params: {
                /** TODO: should these be strings? */
                lat: latLon.lat,
                lon: latLon.lon,
                limit: 5,
            }
        });
        /** The api returns an array of size 1 usually. */
        return res.data[0];
    }

    /**
     * 
     * TODO this should be changed; only for query requests in the search
     * 
     * @param cityStateCountry City name, state code (only for the US) and country code divided by comma. Please use ISO 3166 country codes.
     */
    async getGeolocationByCity(cityStateCountry: String): Promise<IGeoLocation[]> {
        const res = await this.client.get('/geo/1.0/direct', {
            params: {
                /** TODO: should these be strings? */
                q: cityStateCountry,
                limit: 5,
            }
        });
        return res.data;
    }
}