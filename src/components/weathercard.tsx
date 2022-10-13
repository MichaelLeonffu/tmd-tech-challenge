import { observer } from "mobx-react";
import React from "react";
import ILocalWeather from "../types/local-weather";
import IGeoLocation from "../types/geolocation";

import { TenDayForecast, HourlyForecast, CurrentDetailsTable } from "./weatherwidget";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";


/** Not sure what is the best way to do this part... Typing and using good practices... */
// interface Props {
//     children: React.ReactNode
// }
// const WeatherCard: React.FC<{ localWeather: LocalWeather}> = observer(
// const WeatherCard = ({children}: Props): JSX.Element => {

const WeatherCard: React.FC<{ localWeather: ILocalWeather, geolocation: IGeoLocation }> = observer(
    ({ localWeather, geolocation }) => {

        const RenderedCurrentDetailsTable = <CurrentDetailsTable localWeather={localWeather} geolocation={geolocation}/>;
        const RenderedHourlyForecast = <HourlyForecast hourlyWeather={localWeather.hourly} />;
        const RenderedTenDayForecast = <TenDayForecast localWeather={localWeather}/>;

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

                    minHeight: "38rem",
                }}>
                    <Box
                        sx={{display: {xs: "block", md: "none"},}}
                    >
                        <Stack gap={2} sx={{
                            pl: "1rem",
                            justifyContent: "space-between",
                            height: "100%",
                        }}>
                            {RenderedCurrentDetailsTable}
                            {RenderedHourlyForecast}
                            {RenderedTenDayForecast}
                        </Stack>
                    </Box>
                    <Box
                        sx={{display: {xs: "none", md: "block"},}}
                    >
                        <Grid container sx={{
                            height: "100%",
                        }}>
                            <Grid xs={4} item={true}>
                                <Container disableGutters sx={{
                                    height: "100%",
                                }}>
                                    {RenderedTenDayForecast}
                                </Container>
                            </Grid>
                            <Grid xs={8} item={true}>
                                <Stack gap={2} sx={{
                                    pl: "1rem",
                                    justifyContent: "space-between",
                                    height: "100%",
                                }}>
                                    {RenderedCurrentDetailsTable}
                                    {RenderedHourlyForecast}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Container>
        );
    }
);

export default WeatherCard;