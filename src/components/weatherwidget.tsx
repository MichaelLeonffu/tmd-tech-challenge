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

import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import CompressIcon from '@mui/icons-material/Compress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AirIcon from '@mui/icons-material/Air';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';

import Divider from "@mui/material/Divider";
import ILocalWeather from "../types/local-weather";
import { fontFamily } from "@mui/system";

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
        <div key={Number(dayWeather.dt)}>
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
            <Container disableGutters sx={{
                p: "1rem",
                height: "100%",
            }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-around"
                    gap={1}
                    spacing={1}
                    sx={{
                        mb: "1rem",
                    }}
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
                    // bgcolor: "background.paper",
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
                backgroundColor: "rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(64px)",
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

const CurrentDetailsTable: React.FC<{ localWeather: LocalWeather }> = observer(
    ({ localWeather }) => {

        /** Reference https://weather.com/weather/today/l/6caf363b20330ebd578b326e30c259c895b39fe2a4e4722f745fc3ae18d3acdb */

        return (
            <Paper sx={{
                p: "1rem",
                backgroundColor: "rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(64px)",
            }}>
                <Typography variant="h5" sx={{
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                    mb: "1rem",
                }}>
                    {localWeather.timezone}
                </Typography>
                <Typography variant="h4" sx={{
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                }}>
                    {Math.round(localWeather.current.feels_like)}°
                </Typography>
                <Typography variant="subtitle2" sx={{
                    fontFamily: "sans-serif",
                    mb: "1rem",
                }}>
                    Feels Like
                </Typography>

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={1}
                >
                    <List sx={{
                        width: "100%",
                        maxWidth: 360,
                        // bgcolor: "background.paper",
                    }}>
                        {
                            [
                                {
                                    icon: <ThermostatIcon />,
                                    name: "High/Low",
                                    value: `${Math.round(localWeather.daily[0].temp.min)}° / ${Math.round(localWeather.daily[0].temp.max)}°`,
                                },
                                {
                                    icon: <OpacityIcon />,
                                    name: "Humidity",
                                    value: `${localWeather.current.humidity}%`,
                                },
                                {
                                    icon: <CompressIcon />,
                                    name: "Pressure",
                                    /** Given in hPa; 1hPa = 0.030 inHg */
                                    value: `${(localWeather.current.pressure * 0.03).toPrecision(3)} inHg`,
                                },
                                {
                                    icon: <VisibilityIcon />,
                                    name: "Visibility",
                                    /** Given in meters, 1 meter = 1/1609 mi */
                                    value: `${Math.round(localWeather.current.visibility/1609)} mi`,
                                },
                            ].map((detail) => {
                                return (
                                    <div key={detail.name}>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                {detail.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={detail.name} primaryTypographyProps={{
                                                align: "left",
                                            }}/>
                                            <ListItemText secondary={detail.value} secondaryTypographyProps={{
                                                align: "right",
                                                variant: "body2",
                                                fontWeight: "bold",
                                                noWrap: true
                                            }} />
                                        </ListItem>
                                    </div>
                                );
                            })
                        }
                    </List>
                    <List sx={{
                        width: "100%",
                        maxWidth: 360,
                        // bgcolor: "background.paper",
                    }}>
                        {
                            [
                                {
                                    icon: <AirIcon />,
                                    name: "Wind",
                                    /** TODO: Keep track of units in query result */
                                    value: `${localWeather.current.wind_speed} mph`,
                                },
                                {
                                    icon: <OpacityIcon />,
                                    name: "Dew Point",
                                    value: `${localWeather.current.dew_point}°`,
                                },
                                {
                                    icon: <WbSunnyIcon />,
                                    name: "UV Index",
                                    value: `${localWeather.current.uvi} of 10`,
                                },
                                {
                                    icon: <NightlightRoundIcon />,
                                    name: "Moon Phase",
                                    /** Missing values in between: waxing crescent... */
                                    value: ["New Moon", "First Quarter Moon", "Full Moon", "Last Quarter Moon", "New Moon"][Math.round(localWeather.daily[0].moon_phase * 4)],
                                },
                            ].map((detail) => {
                                return (
                                    <div key={detail.name}>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                {detail.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={detail.name} primaryTypographyProps={{
                                                align: "left",
                                            }}/>
                                            <ListItemText secondary={detail.value} secondaryTypographyProps={{
                                                align: "right",
                                                variant: "body2",
                                                fontWeight: "bold",
                                                noWrap: true
                                            }} />
                                        </ListItem>
                                    </div>
                                );
                            })
                        }
                    </List>
                </Stack>
            </Paper>
        );
    }
);

export {
    TenDayForecast,
    HourlyForecast,
    CurrentDetailsTable,
};