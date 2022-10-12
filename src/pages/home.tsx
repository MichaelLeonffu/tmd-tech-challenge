import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useAppContext } from "../app-context";

import ILatLon from "../types/latlon";
import LatLon from "../models/latlon";
import LocalWeather from "../models/local-weather";

import WeatherCard from "../components/weathercard";
import NavBar from "../components/navbar";

import {
    Container,
} from "@mui/material";

const HomePage = observer(() => {

    const { api, store } = useAppContext();
    const [apiData, setApiData] = useState({});
    const [position, setPosition] = useState({});
    const [loading, setLoading] = useState(false);
    const latLon = new LatLon({lat: -45, lon: 90});

    useEffect(() => {
        // api.client.get('', {params: {...latLon}})
        //     .then((response) => {
        //         setApiData(response.data);
        //         let downloadedLocalWeather = new LocalWeather(response.data);
        //         store.loadLocalWeather(latLon, downloadedLocalWeather);
        //     });
        (async () => {
            // await api.getGeolocationFromLatLon(latLon);
            // await api.getGeolocationByCity("London");
            await api.getLocalWeather(latLon);
            const geoData = store.getGeolocation(Array.from(store.locations.values())[0]);
            const localWeatherData = store.getLocalWeather(latLon);
            if (geoData) {
                setApiData(geoData);
                setLoading(!loading);
            }
        })();

        // if ("geolocation" in navigator) {
        //     console.log("nav available");
        //     (async () => {
        //         navigator.geolocation.getCurrentPosition(function(resPosition) {
        //             const myLatLon: ILatLon = {lat: resPosition.coords.latitude, lon: resPosition.coords.longitude};
        //             setPosition(myLatLon);
        //             console.log("lat: ", resPosition.coords.latitude);
        //             console.log("lon: ", resPosition.coords.longitude);
        //             console.log("this", position);
        //             setLoading(!loading);
        //         });
        //     })();
        // } else {
        //     console.log("nav not available");
        // }

    }, []);

    function updateStore() {
        let copy0 = store.localWeathers.get(0);
        let copy1 = store.localWeathers.get(1);
        let copy2 = store.localWeathers.get(2);
        console.log("b4", copy0);
        console.log("b4", copy1);
        console.log("b4", copy2);
        api.getLocalWeather({lat: 80, lon: 12});
        copy0 = store.localWeathers.get(0);
        copy1 = store.localWeathers.get(1);
        copy2 = store.localWeathers.get(2);
        console.log("b4", copy0);
        console.log("b4", copy1);
        console.log("b4", copy2);
        api.getLocalWeather({lat: 80, lon: 13});
        copy0 = store.localWeathers.get(0);
        copy1 = store.localWeathers.get(1);
        copy2 = store.localWeathers.get(2);
        console.log("b4", copy0);
        console.log("b4", copy1);
        console.log("b4", copy2);

        console.log("af", store.localWeathers);
        copy0 = store.localWeathers.get(0);
        copy1 = store.localWeathers.get(1);
        copy2 = store.localWeathers.get(2);
        console.log("b4", copy0);
        console.log("b4", copy1);
        console.log("b4", copy2);

        store.reorderLocations(Array.from(store.locations.keys()));
    }

    // useEffect(() => {
    //     api.client.get('', {params: {...latLon}})
    //         .then((response) => {
    //             setApiData(response.data);
    //             let downloadedLocalWeather = new LocalWeather(response.data);
    //             store.load(latLon, downloadedLocalWeather);
    //         })
    // }, []);

    const IdataToShow = store.localWeathers.get(0);

    if (!IdataToShow) return null;

    const dataToShow = new LocalWeather(IdataToShow);

    return (
        <div>
            <NavBar localWeather={dataToShow}/>
            {/* <p>{JSON.stringify(position)}</p>
            <p>{JSON.stringify(apiData)}</p>
            <p>{loading ? "true" : "false"}</p>
             */}
            <div>
                <h1>Change Store</h1>
                <button onClick={updateStore}>Store Update</button>
            </div>
            <Container sx={{
                rowGap: "4rem",
            }}>
                {
                    Array.from(store.locationOrder).map((locationId: number) => {
                        return (<WeatherCard key={locationId} localWeather={dataToShow} />)
                    })
                }
                {/* <WeatherCard localWeather={dataToShow} /> */}
            </Container>
        </div>
    );
});

export default HomePage;