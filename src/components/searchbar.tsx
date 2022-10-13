import React from "react";
import { observer } from "mobx-react";
import { useAppContext } from "../app-context";

import IGeoLocation from "../types/geolocation";

import { runInAction } from "mobx";

import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import InputBase from "@mui/material/InputBase";
import Zoom from "@mui/material/Zoom";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Container from "@mui/material/Container";

const SearchInputBar = styled(Box)(({ theme }) => ({
    position: "absolute",
    zIndex: 1,

    left: "50%",
    marginLeft: "-18rem",
    display: "block",
    maxWidth: "36rem",
    minWidth: "32rem",
    borderRadius: "22px",
    // shadow: 23,
    backgroundColor: theme.palette.common.white,
    // "&:focus": {
    //     /** Make shadow! */
    //     backgroundColor: alpha(theme.palette.common.white, 0.25)
    // },
    // [theme.breakpoints.up("sm")]: {
    //     marginLeft: theme.spacing(1),
    //     width: "auto",
    // },
}));

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    paddingTop: "5px",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    // "&:hover": {
    //     backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    alignItems: "center",
    width: "100%",
    "& .Mui-focused": {
        color: "error",
    },

    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        // width: "100%",
        // [theme.breakpoints.up("sm")]: {
        //     width: "20ch",
        //     "&:focus": {
        //         width: "30ch",
        //     },
        // },
    },
}));

const SearchBar: React.FC<{ }> = observer(() => {

    /** Reference: https://www.google.com */

    /** Get the store, this component almost directly communicates with the context */
    const { api, store } = useAppContext();

    const emptyString: string = "";
    const [searchQuery, setSearchQuery] = React.useState(emptyString);
    const [searchFocus, setSearchFocus] = React.useState(false);

    /** 
     * The initial searchbar state, minimized, no autocomplete options. 
     * 
     * true: initial, after text changes
     * false: after enter is pressed and the query is submitted
     * */
    const [searchBarReady, setSearchBarReady] = React.useState(true);
    /** 
     * Actively waiting for a API response, not the same as waiting for input 
     * 
     * true: initial, when a query is sent
     * false: when a res is obtained, or when text changes.
     * */
    const [waitingForRes, setWaitingForRes] = React.useState(true);

    /**
     * Waiting for the weather data query after a button is pressed in the menu
     */
    const [waitingForWeatherData, setWaitingForWeatherData] = React.useState(false);

    const arrayOfGeolocationType: IGeoLocation[] = [];
    const [serachQueryResults, setSerachQueryResults] = React.useState(arrayOfGeolocationType);


    const searchResults = function() {

        /** If weather data is pending */
        if(waitingForWeatherData) {
            return (
                <Container disableGutters>
                <Divider />
                <List>
                    <ListItem>
                        <ListItemText primary="Waiting for OpenWeatherAPI..." />
                    </ListItem>
                </List>
            </Container>
            );
        }

        /** Don't show anything if not in focus */
        if (!searchFocus) {
            return (<></>);
        }

        /** Also don't show anything if in ready mode; nothing to show! */
        if (searchBarReady) {
            return (<></>);
        }

        /** If results aren't in yet, show loading... */
        if (waitingForRes) {
            return (
                <Container disableGutters>
                <Divider />
                <List>
                    <ListItem>
                        <ListItemText primary="Loading..." />
                    </ListItem>
                </List>
            </Container>
            );
        }

        return (
            <Container disableGutters>
                <Divider />
                {serachQueryResults.map((location: IGeoLocation) => {

                    const locationFullName = `${location.name}, ${location.state}, ${location.country}`

                    return (
                        <div key={locationFullName}>
                            <List disablePadding={true}>
                                <ListItemButton sx={{
                                    py: 0,
                                    pl: "25px",
                                    
                                }}>
                                    <ListItemIcon>
                                        <SearchIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={locationFullName}
                                        sx={{
                                            py: "0.32rem",
                                        }}
                                        onClick={() => {
                                            console.log("clicked", location.lat, location.lon);
                                            const coords = {lat: location.lat, lon: location.lon};
                                            setWaitingForWeatherData(true);

                                            runInAction(() =>{
                                                ( async () => {
                                                    try {

                                                        await store.requestWeather(coords);
                                                    } finally {
                                                        setWaitingForWeatherData(false);
                                                    }
                                                })()
                                            });

                                        }}
                                    />
                                </ListItemButton>
                            </List>
                        </div>
                    );
                })}
            </Container>
        );
    }

    return (
        <Tooltip
                title="Press enter to search!"
                placement="top"
                TransitionComponent={Zoom}
                enterDelay={100}
                leaveDelay={100}
                disableInteractive
                arrow
                onBlur={() => {

                    /** 
                     * Really rough but it works for now!
                     * 
                     * TODO: Fix this: it makes the autocomplete results dropdown
                     * disappear before the "onClick" event occurs!
                     */
                    setTimeout(() => {
                        setSearchFocus(false);
                    }, 200);

                }}
            >
            <SearchInputBar 
                sx={{
                    // height: (searchFocus ? "30rem" : "3rem"),
                    minHeight: "3rem",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(5px)",
                }}
            >
                    <Search sx={{
                        // mr: "auto"
                    }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            // placeholder="Search City or Zip Code"
                            placeholder="Search City"
                            inputProps={{ "aria-label": "search" }}
                            onFocus={() => {
                                setSearchFocus(true);
                            }}
                            // onBlur={() =>{
                            //     setSearchFocus(false);
                            // }}
                            onChange={(event) => {
                                setSearchQuery(event.target.value);
                                setWaitingForRes(false);
                                setSearchBarReady(true);
                            }}
                            onKeyDown={(event) => {
                                if (event.code === "Enter") {
                                    /** Do the search */
                                    setSearchBarReady(false);
                                    (async () => {
                                        try{
                                            setWaitingForRes(true);
                                            const data = await api.getGeolocationByCity(searchQuery);
                                            console.log(data);
                                            setSerachQueryResults(data);
                                        } finally {
                                            setWaitingForRes(false);
                                        }
                                    })();
                                }
                            }}
                        />
                    </Search>
                {searchResults()}
            </SearchInputBar>
        </Tooltip>
    );
});


export default SearchBar;