import { observer } from "mobx-react";
import { useAppContext } from "../app-context";

import NavBar from "../components/navbar";
import SearchBar from "../components/searchbar";
import WeatherCard from "../components/weathercard";
import Container from "@mui/material/Container";

const HomePage = observer(() => {

    const { store } = useAppContext();

    return (
        <div>
            <NavBar/>
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