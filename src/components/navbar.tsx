import { observer } from "mobx-react";
import React from "react";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Zoom from '@mui/material/Zoom';

const options: string[] = ["options1", "options2"];

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
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
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "20ch",
            "&:focus": {
                width: "30ch",
            },
        },
    },
}));

const NavBar: React.FC<{ }> = observer(() => {

    const emptyString: string = "";
    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState(emptyString);
    const [showDropDown, setShowDownDown] = React.useState(false);

    const [searchContents, setSearchContents] = React.useState(emptyString);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        // edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{
                            mr: 2,
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            // flexGrow: 1,
                            display: { xs: "none", sm: "block" },
                        }}
                    >
                        TMDTC
                    </Typography>
                    {/* <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            maxWidth: "96rem",
                            display: { xs: "none", sm: "block" },
                        }}
                    >
                    </Typography> */}
                    {/* <SearchIcon /> */}

                    {/* <Tooltip
                        title="Press enter to search!"
                        placement="bottom"
                        TransitionComponent={Zoom}
                        enterDelay={100}
                        leaveDelay={100}
                        disableInteractive
                        arrow
                    >
                        <Search sx={{
                            mr: "auto",
                        }}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search City or Zip Code"
                                inputProps={{ "aria-label": "search" }}
                                onChange={(event) => {
                                    setSearchContents(event.target.value)
                                }}
                                onKeyDown={(event) => {
                                    if (event.code === "Enter") {
                                        console.log("enter pressed");
                                        console.log("Query: ", searchContents)
                                    }
                                }}
                            />
                            <SearchDrop
                                value="options1"
                                onChange={(event, newValue) => {
                                    setValue(newValue ? String(newValue) : "");
                                }}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                id="controllable-states-demo"
                                options={options}
                                sx={{
                                    width: 300,
                                    display: showDropDown ? "block" : "none",
                                }}
                                renderInput={(params) => <TextField {...params} label="Search Organization ..." />}
                            />
                        </Search>
                    </Tooltip> */}
                </Toolbar>
            </AppBar>
        </Box>
    );
});

export default NavBar;