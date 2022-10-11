import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useAppContext } from "../app-context";

import LatLon from "../models/latlon";

const HomePage = observer(() => {

    const { api, store } = useAppContext();
    const [apiData, setApiData] = useState({});
    const latLon = new LatLon({lat: -45, lon: 90});

    useEffect(() => {
        // api.client.get('', {params: {...latLon}})
        //     .then((response) => {
        //         setApiData(response.data);
        //         let downloadedLocalWeather = new LocalWeather(response.data);
        //         store.loadLocalWeather(latLon, downloadedLocalWeather);
        //     });
        (async () => {
            await api.getGeolocationFromLatLon(latLon);
            await api.getGeolocationByCity("London");
            await api.getLocalWeather(latLon);
            const geoData = store.getGeolocation(Array.from(store.locations.values())[0]);
            const localWeatherData = store.getLocalWeather(latLon);
            if (geoData) {
                setApiData(geoData);
            }
        })();
    }, []);

    // useEffect(() => {
    //     api.client.get('', {params: {...latLon}})
    //         .then((response) => {
    //             setApiData(response.data);
    //             let downloadedLocalWeather = new LocalWeather(response.data);
    //             store.load(latLon, downloadedLocalWeather);
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