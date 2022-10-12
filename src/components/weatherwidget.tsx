import { observer } from "mobx-react";
import React from "react";
import LocalWeather from "../models/local-weather";

import Container from "@mui/material/Container";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Image from "mui-image";

import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import UmbrellaIcon from "@mui/icons-material/Umbrella";

import Divider from "@mui/material/Divider";
import ILocalWeather from "../types/local-weather";

const DAYS_OF_WEEK = "Mon Tue Wed Thu Fri Sat Sun".split(" ");

const aDayInTenDayForcast = function (timezone_offset: number, [dayWeather]: ILocalWeather['daily']) {

    /** How do I do I type this properly? */

    const tempMinMax = `L: ${Math.round(dayWeather.temp.min)}° H: ${Math.round(dayWeather.temp.max)}°`;

    /** Reading time properly in seconds
     * Referenced this post: https://stackoverflow.com/questions/62376115/how-to-obtain-open-weather-api-date-time-from-city-being-fetched
     */

    // const d = new Date();
    // const localTime = d.getTime();
    // const localOffset = d.getTimezoneOffset() * 60000;
    // const utc = localTime + localOffset;
    // const queryLocation = utc + (1000 * timezone_offset);
    // const nd = new Date(queryLocation);
    // console.log(nd);

    const projectedDate = new Date(Number(dayWeather.dt) * 1000);
    const dayOfWeek = DAYS_OF_WEEK[projectedDate.getDay()];
    const iconURL = `https://openweathermap.org/img/wn/${dayWeather.weather[0].icon}.png`

    return (
        <div>
            <Divider />
            <ListItem >
                <ListItemIcon>
                    {/* <WbCloudyIcon /> */}
                    <Image 
                        src={iconURL}
                        height="3rem"
                        width="3rem"
                        fit="cover"
                        easing="ease-in"
                        duration={500}
                        distance="10"
                    />
                </ListItemIcon>
                <ListItemText primary={dayOfWeek} />
                <ListItemText secondary={tempMinMax} secondaryTypographyProps={
                    {
                        variant: "body2",
                        fontWeight: "bold",
                        noWrap: true,
                        align: "right"
                    }
                } />
            </ListItem>
        </div>
    );
}

const TenDayForecast: React.FC<{ localWeather: LocalWeather }> = observer(
    ({ localWeather }) => {

        /** Extract 10 Day forecast for this weather */

        return (
            <Container sx={{p: "4px"}}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-around"
                    gap={1}
                    spacing={1}
                    sx={{my: "1rem"}}
                >
                    {/* Make this change as the view changes smaller */}
                    <CalendarMonthIcon />
                    <Typography
                        variant="body2"
                        noWrap={true}
                    >
                        10-DAY FORECAST
                    </Typography>
                </Stack>
                <List sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                }}>
                    {/* <ListItem>
                        <ListItemAvatar>
                        <WbCloudyIcon />
                        </ListItemAvatar>
                        <ListItemText
                        primary="Today"
                        secondary="L: 65° H: 80°"
                        secondaryTypographyProps={
                            {variant: "subtitle1", fontWeight: "bold"}
                        } />
                    </ListItem> */}
                    {/* <Divider component="li" />
                    <ListItem >
                        <ListItemIcon>
                            <WbCloudyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tuesday" />
                        <ListItemText secondary="L: 65° H: 80°" secondaryTypographyProps={
                            {variant: "body2", fontWeight: "bold", noWrap: true}
                        } />
                    </ListItem> */}

                    {
                        localWeather.daily.map((dayWeather) => {
                            return aDayInTenDayForcast(localWeather.timezone_offset, [dayWeather]);
                        })
                    }

                </List>
            </Container>
        );
    }
);

const HourlyForecast: React.FC<{ hourlyWeather: LocalWeather['hourly'] }> = observer(
    ({ hourlyWeather }) => {

        return (
            <Paper sx={{
                pb: "1rem",
                mb: "2rem",
            }}>
                <Container>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-start"
                        gap={1}
                        sx={{my: "1rem"}}
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
                        sx={{my: "1rem"}}
                    >
                        {
                            ["NOW",1,2,3,4,5,6,7,8,9].map((val) => {
                                return (
                                    <Stack
                                        alignItems="center"
                                        sx={{my: "1rem"}}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            noWrap={true}
                                        >
                                            {val}
                                        </Typography>
                                        <WbCloudyIcon />
                                        <Typography
                                            variant="subtitle1"
                                            noWrap={true}
                                        >
                                            65°
                                        </Typography>
                                    </Stack>
                                );
                            })
                        }
                    </Stack>
                </Container>
            </Paper>
        );
    }
);

export {
    TenDayForecast,
    HourlyForecast
};