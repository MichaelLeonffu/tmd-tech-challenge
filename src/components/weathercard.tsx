import { observer } from "mobx-react";
import React from "react";
import LocalWeather from "../models/local-weather";
import ILocalWeather from "../types/local-weather";
import ILatLon from "../types/latlon";
import IGeoLocation from "../types/geolocation";

import { TenDayForecast, HourlyForecast, CurrentDetailsTable} from "./weatherwidget";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";


/** Not sure what is the best way to do this part... Typing and using good practices... */
// interface Props {
//     children: React.ReactNode
// }
// const WeatherCard: React.FC<{ localWeather: LocalWeather}> = observer(
// const WeatherCard = ({children}: Props): JSX.Element => {

const WeatherCard: React.FC<{ localWeather: ILocalWeather, geolocation: IGeoLocation }> = observer(
    ({ localWeather, geolocation }) => {

        return (
            <Container maxWidth="lg" disableGutters sx={{
                p: "0rem",
                // mt: "4rem",
                borderRadius: "8rem",
                // backgroundImage: "linear-gradient(45deg, #4ba3c7, #81d4fa, #b6ffff, #ffe97d, #ffb74d, #c88719)",
                // backgroundRepeat: "no-repeat",
                // backgroundSize: "fill",
            }}>
                <Card sx={{
                    p: "2rem",
                    mb: "4rem",
                    backgroundColor: "rgba(160, 160, 160, 0.15)",
                    backdropFilter: "blur(64px)",
                    borderRadius: "16px",

                    height: "38rem",
                }}>
                    <Grid container sx={{
                        height: "100%",
                    }}>
                        <Grid xs={4}>
                            <Container disableGutters sx={{
                                height: "100%",
                            }}>
                                <Paper sx={{
                                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                                    backdropFilter: "blur(64px)",
                                    height: "100%",
                                }}>
                                    <TenDayForecast localWeather={localWeather}/>
                                </Paper>
                            </Container>
                        </Grid>
                        <Grid xs={8}>
                            <Stack gap={2} sx={{
                                pl: "1rem",
                                justifyContent: "space-between",
                                height: "100%",
                            }}>
                                <CurrentDetailsTable localWeather={localWeather} geolocation={geolocation}/>
                                <HourlyForecast hourlyWeather={localWeather.hourly} />
                            </Stack>
                        </Grid>
                    </Grid>
                </Card>
                {/* <p>{JSON.stringify(localWeather)}</p> */}
            </Container>
        );
    }
);

export default WeatherCard;