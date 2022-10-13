import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useAppContext } from "../app-context";

import LatLon from "../models/latlon";

import NavBar from "../components/navbar";
import SearchBar from "../components/searchbar";
import WeatherCard from "../components/weathercard";
import Container from "@mui/material/Container";

const HomePage = observer(() => {

    const { api, store } = useAppContext();
    const [apiData, setApiData] = useState({});
    const [loading, setLoading] = useState(false);
    const latLon = new LatLon({lat: -45, lon: 90});

    useEffect(() => {
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

    }, []);

    function showStore() {
        console.log("Store: ", store);
    }

    return (
        <div>
            <NavBar/>
            {/* <button onClick={showStore}>Store Update</button> */}
            <Container sx={{height: "1rem"}} />
            <SearchBar />
            <Container sx={{
                rowGap: "4rem",
                mt: "4rem",
            }}>
                {
                    Array.from(store.locationOrder).map((locationId: number) => {
                        const localWeather = store.localWeathers.get(locationId);
                        const geolocation = store.geolocations.get(locationId);
                        if (!localWeather || !geolocation) {
                            return <></>
                        }
                        return (
                            <WeatherCard
                                key={locationId}
                                localWeather={localWeather}
                                geolocation={geolocation}
                            />
                        );
                    })
                }
            </Container>
        </div>
    );
});

export default HomePage;