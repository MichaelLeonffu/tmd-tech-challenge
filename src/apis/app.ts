import axios from "axios";
import AppStore from "../stores/app";

import ILatLon from "../types/latlon";
import ILocalWeather from "../types/local-weather";
import LocalWeather from "../models/local-weather";

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
        const res = await this.client.get('', {
            params: {
                /** TODO: should these be strings? */
                lat: latLon.lat,
                lon: latLon.lon,
            }
        });
        this.store.load(latLon, res.data);
    }
}