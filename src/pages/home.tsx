import { observer } from "mobx-react";
import { useAppContext } from "../app-context";

import NavBar from "../components/navbar";
import SearchBar from "../components/searchbar";
import WeatherCard from "../components/weathercard";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const HomePage = observer(() => {

    const { store } = useAppContext();

    return (
        <Box
            sx={{
                backgroundImage: "linear-gradient(45deg, #81d4fa, #b6ffff, #ffe97d, #ffce84)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "fill",
                minHeight: "100vh",
            }}
        >
            <NavBar/>
            <Container sx={{height: "1rem"}} />
            <SearchBar />
            <Container sx={{
                rowGap: "4rem",
                mt: "4rem",
                maxHeight: "100%",
                overflow: "auto",
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
        </Box>
    );
});

export default HomePage;