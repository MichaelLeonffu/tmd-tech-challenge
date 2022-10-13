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

interface IDetail {
    /** Not sure what to call this one... */
    icon: any;
    name: string;
    value: string;
}

const weatherDetailsList = (localWeather: ILocalWeather): IDetail[] => {
    return [
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
            // value: `${(localWeather.current.pressure * 0.03).toPrecision(3)} inHg`,
            value: `${localWeather.current.pressure} inHg`,
        },
        {
            icon: <VisibilityIcon />,
            name: "Visibility",
            /** Given in meters, 1 meter = 1/1609 mi */
            // value: `${Math.round(localWeather.current.visibility/1609)} mi`,
            value: `${localWeather.current.visibility} mi`,
        },
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
    ];
};

const generateDetailRow = (detail: IDetail) => {
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
};

/**
 * 
 * @param localWeather a ILocalWeather data instance
 * @param split if true, splits table into two halves
 * @returns a table showing weather details
 */
const generateDetailTable = (localWeather: ILocalWeather, split: boolean) => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
        >
                <List sx={{
                width: "100%",
                maxWidth: 360,
            }}>
                {
                    weatherDetailsList(localWeather).slice(0, 4).map((detail) => {
                        return generateDetailRow(detail);
                    })
                }
            </List>
            <List sx={{
                width: "100%",
                maxWidth: 360,
            }}>
                {
                    weatherDetailsList(localWeather).slice(4, 8).map((detail) => {
                        return generateDetailRow(detail);
                    })
                }
            </List>
        </Stack>
    );
}

const CurrentDetailsTable: React.FC<{ localWeather: ILocalWeather, geolocation: IGeolocation }> = observer(
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

            {generateDetailTable(localWeather, true)}
        </Paper>
    );
});

export default CurrentDetailsTable;