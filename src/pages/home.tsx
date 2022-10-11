import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useAppContext } from "../app-context";

import ILocalWeather from "../types/local-weather";
import LocalWeather from "../models/local-weather";
import ILatLon from "../types/latlon";
import LatLon from "../models/latlon";

const HomePage = observer(() => {

    const { api, store } = useAppContext();
    const [apiData, setApiData] = useState(null);
    const latLon = new LatLon({lat: -45, lon: 90});

    useEffect(() => {
        api.client.get('', {params: {...latLon}})
            .then((response) => {
                setApiData(response.data);
                let downloadedLocalWeather = new LocalWeather(response.data);
                store.load(latLon, downloadedLocalWeather);
            })
    }, []);

    // useEffect(() => {
    //     api.client.get('', {params: {...latLon}})
    //         .then((response) => {
    //             setApiData(response.data);
    //             let downloadedLocalWeather = new LocalWeather(response.data);
    //             store.load(latLon, downloadedLocalWeather);
    //             console.log(store.locations);
    //         })
    // }, []);

    if (!apiData) return null;

    return (
        <div>
            <p>{JSON.stringify(apiData)}</p>
        </div>
    );
});

export default HomePage;