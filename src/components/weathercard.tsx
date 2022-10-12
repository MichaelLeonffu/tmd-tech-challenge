import { observer } from "mobx-react";
import React from "react";
import LocalWeather from "../models/local-weather";
import ILocalWeather from "../types/local-weather";

import { TenDayForecast, HourlyForecast } from "./weatherwidget";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";


/** Not sure what is the best way to do this part... Typing and using good practices... */
// interface Props {
//     children: React.ReactNode
// }
// const WeatherCard: React.FC<{ localWeather: LocalWeather}> = observer(
// const WeatherCard = ({children}: Props): JSX.Element => {

const WeatherCard: React.FC<{ localWeather: LocalWeather }> = observer(
    ({ localWeather }) => {

        return (
            <Container maxWidth="lg" sx={{
                p: 0,
                mt: "4rem",
            }}>
                <Card elevation={2} sx={{
                    p: "3rem",
                }}>
                    <p>Some Location... Maybe its {localWeather.timezone}</p>
                    <Grid container>
                        <Grid xs={4}>
                            <Container>
                                <Paper>
                                    <TenDayForecast localWeather={localWeather}/>
                                </Paper>
                            </Container>
                        </Grid>
                        <Grid xs={8}>
                            <Container sx={{
                                height: 1,
                            }}>
                                <HourlyForecast hourlyWeather={localWeather.hourly}/>
                                <Paper sx={{
                                    p: "2rem",
                                }}>
                                    <p>Wow I'm item 3</p>
                                    <p>Wow I'm item 3</p>
                                    <p>Wow I'm item 3</p>
                                    <p>Wow I'm item 3</p>
                                    <p>Wow I'm item 3</p>
                                    <p>Wow I'm item 3</p>
                                </Paper>
                            </Container>
                        </Grid>
                    </Grid>
                </Card>
                {/* <p>{JSON.stringify(localWeather)}</p> */}
            </Container>
        );
    }
);

export default WeatherCard;