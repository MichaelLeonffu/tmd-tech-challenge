import { observer } from "mobx-react";
import React from "react";
import ILocalWeather from "../types/local-weather";

/** UI Elements */
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
import Divider from "@mui/material/Divider";

const DAYS_OF_WEEK = "Mon Tue Wed Thu Fri Sat Sun".split(" ");
/** I should be cascading these styles down */
// const ALL_BG_COLOR = "rgba(255, 255, 255, 0.95)";
// const ALL_BG_FILTER = "blur(64px)";

const aDayInTenDayForecast = function (timezone_offset: number, [dayWeather]: ILocalWeather['daily']) {

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

const TenDayForecast: React.FC<{ localWeather: ILocalWeather }> = observer(
    ({ localWeather }) => {

        /** Extract 10 Day forecast for this weather */

        return (
            <Paper sx={{
                // backgroundColor: {ALL_BG_COLOR},
                // backdropFilter: {ALL_BG_FILTER},
                height: "100%",
            }}>
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
                        maxWidth: {sx: 1000, md: 360},
                        // bgcolor: "background.paper",
                    }}>
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
                                return aDayInTenDayForecast(localWeather.timezone_offset, [dayWeather]);
                            })
                        }

                    </List>
                </Container>
            </Paper>
        );
    }
);

export default TenDayForecast;