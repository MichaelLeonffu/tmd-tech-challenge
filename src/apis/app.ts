import axios from "axios";
import AppStore from "../stores/app";

import ILatLon from "../types/latlon";

export default class AppApi {

    /** Setup the client, later anything can use this setup to make queries to the API server */
    client = axios.create({
        baseURL: "/api/openweatherapi",
        timeout: 4000,
        params: {
            exclude: "alert,minutely",
            appid: "Something really secret"
        },
    });

    constructor(private store: AppStore) {}

    async getLocalWeather(latLon: ILatLon) {
        const res = await this.client.get('/data/3.0/onecall', {
            params: {
                /** TODO: should these be strings? */
                lat: latLon.lat,
                lon: latLon.lon,
            }
        });
        this.store.loadLocalWeather(latLon, res.data);
    }

    async getGeolocationFromLatLon(latLon: ILatLon) {
        const res = await this.client.get('/geo/1.0/reverse', {
            params: {
                /** TODO: should these be strings? */
                lat: latLon.lat,
                lon: latLon.lon,
                limit: 5,
            }
        });
        this.store.loadGeolocation(latLon, res.data[0]);
    }

    /**
     * 
     * TODO this should be changed; only for query requests in the search
     * 
     * @param cityStateCountry City name, state code (only for the US) and country code divided by comma. Please use ISO 3166 country codes.
     */
    async getGeolocationByCity(cityStateCountry: String) {
        const res = await this.client.get('/geo/1.0/direct', {
            params: {
                /** TODO: should these be strings? */
                q: cityStateCountry,
                limit: 5,
            }
        });
        const latLon = {lat: res.data[0].lat, lon: res.data[0].lon}
        this.store.loadGeolocation(latLon, res.data[0]);
    }
}