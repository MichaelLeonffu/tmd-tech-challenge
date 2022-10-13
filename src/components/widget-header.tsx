import { observer } from "mobx-react";
import React from "react";
import ILocalWeather from "../types/local-weather";
import IGeolocation from "../types/geolocation";

/** UI Elements */
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

/** Detail Table Icons */
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import CompressIcon from '@mui/icons-material/Compress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AirIcon from '@mui/icons-material/Air';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';

/** I should be cascading these styles down */
// const ALL_BG_COLOR = "rgba(255, 255, 255, 0.95)";
// const ALL_BG_FILTER = "blur(64px)";

const WeatherCardHeader: React.FC<{ localWeather: ILocalWeather, geolocation: IGeolocation }> = observer(
    ({ localWeather, geolocation }) => {

        /** Reference https://weather.com/weather/today/l/6caf363b20330ebd578b326e30c259c895b39fe2a4e4722f745fc3ae18d3acdb */

        return (
            <Paper sx={{
                p: "1rem",
                // backgroundColor: {ALL_BG_COLOR},
                // backdropFilter: {ALL_BG_FILTER},
            }}>
                <Typography variant="h5" sx={{
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                    mb: "1rem",
                }}>
                    {`${geolocation.name}, ${geolocation.state}, ${geolocation.country}`}
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

                
            </Paper>
        );
    }
);

export default WeatherCardHeader;