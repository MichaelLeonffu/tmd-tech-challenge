import React from "react";
import { observer } from "mobx-react";
import { useAppContext } from "../app-context";

import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import InputBase from "@mui/material/InputBase";
import Zoom from "@mui/material/Zoom";
import Divider from "@mui/material/Divider";

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

const SearchBar: React.FC<{ }> = observer(
    () => {

        /** Reference: https://www.google.com */

        /** Get the store, this component almost directly communicates with the context */
        const { api, store } = useAppContext();

        const emptyString: string = "";
        const [searchContents, setSearchContents] = React.useState(emptyString);
        const [searchFocus, setSearchFocus] = React.useState(false);


        return (
            <Tooltip
                    title="Press enter to search!"
                    placement="top"
                    TransitionComponent={Zoom}
                    enterDelay={100}
                    leaveDelay={100}
                    disableInteractive
                    arrow
                >
                <SearchInputBar 
                    sx={{
                        height: (searchFocus ? "30rem" : "3rem"),
                    }}
                >
                        <Search sx={{
                            // mr: "auto"
                        }}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search City or Zip Code"
                                inputProps={{ "aria-label": "search" }}
                                onFocus={() => {
                                    setSearchFocus(true)
                                }}
                                onBlur={() =>{
                                    setSearchFocus(false)
                                }}
                                onChange={(event) => {
                                    setSearchContents(event.target.value)
                                }}
                                onKeyDown={(event) => {
                                    if (event.code === "Enter") {
                                        /** Do the search */
                                    }
                                }}
                            />
                        </Search>
                    {
                    (
                        searchFocus ?
                        <Divider /> :
                        <></>
                        )
                    }
                </SearchInputBar>
            </Tooltip>
        );
    }
);


export default SearchBar;