import { observer } from "mobx-react";
import React from "react";
import ILocalWeather from "../types/local-weather";

/** UI Elements */
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Image from "mui-image";
import Divider from "@mui/material/Divider";
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';

const DAYS_OF_WEEK = "Mon Tue Wed Thu Fri Sat Sun".split(" ");
/** I should be cascading these styles down */
// const ALL_BG_COLOR = "rgba(255, 255, 255, 0.95)";
// const ALL_BG_FILTER = "blur(64px)";

const HourlyForecast: React.FC<{ hourlyWeather: ILocalWeather['hourly'] }> = observer(
    ({ hourlyWeather }) => {

        return (
            <Paper sx={{
                // backgroundColor: {ALL_BG_COLOR},
                // backdropFilter: {ALL_BG_FILTER},
                height: "100%",
            }}>
                <Stack 
                    gap={2}
                    sx={{
                        p: "1rem",
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-start"
                        gap={1}
                        sx={{
                            height: "100%",
                        }}
                    >
                        {/* Make this change as the view changes smaller */}
                        <QueryBuilderIcon />
                        <Typography
                            variant="body2"
                            noWrap={true}
                        >
                            HOURLY FORECAST
                        </Typography>
                    </Stack>
                    <Divider />
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-start"
                        gap={1}
                        sx={{
                            my: "1rem",
                            overflow: "scroll",
                        }}
                    >
                        {
                            hourlyWeather.map((val) => {
                                return (
                                    <div key={Number(val.dt)}>
                                        <Stack
                                            alignItems="center"
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                noWrap={true}
                                            >
                                                {/* Fix the timezone */}
                                                {(new Date(Number(val.dt) * 1000)).getHours()}
                                            </Typography>
                                                <Image 
                                                    src={`https://openweathermap.org/img/wn/${val.weather[0].icon}.png`}
                                                    height="3rem"
                                                    width="3rem"
                                                    fit="cover"
                                                    easing="ease-in"
                                                    duration={500}
                                                    distance="10"
                                                />
                                            <Typography
                                                variant="subtitle1"
                                                noWrap={true}
                                            >
                                                {val.temp}°
                                            </Typography>
                                        </Stack>
                                    </div>
                                );
                            })
                        }
                    </Stack>
                </Stack>
            </Paper>
        );
    }
);

export default HourlyForecast;