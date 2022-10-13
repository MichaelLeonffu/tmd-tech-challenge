import { observer } from "mobx-react";
import React from "react";
import ILocalWeather from "../types/local-weather";
import IGeoLocation from "../types/geolocation";

import { TenDayForecast, HourlyForecast, CurrentDetailsTable } from "./weatherwidget";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
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
                borderRadius: "8rem",
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
                        <Grid xs={4} item={true}>
                            <Container disableGutters sx={{
                                height: "100%",
                            }}>
                                <TenDayForecast localWeather={localWeather}/>
                            </Container>
                        </Grid>
                        <Grid xs={8} item={true}>
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
            </Container>
        );
    }
);

export default WeatherCard;