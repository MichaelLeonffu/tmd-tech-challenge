import { observer } from "mobx-react";
import { runInAction } from "mobx";
import React from "react";
import { useAppContext } from "../app-context";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from "@mui/material/Stack";

const NavBar: React.FC<{ }> = observer(() => {

    const { store } = useAppContext();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                        height: "4rem",
                        marginX: {sm: "3rem", xl: "auto"},
                        minWidth: {sm: "2rem", xl: "94rem"}
                    }}
                >
                    <Typography
                        variant="h5"
                    >
                        TMDTC
                    </Typography>
                    <Tooltip title="Delete All">
                        <IconButton
                        aria-label="delete"
                        onClick={() => {
                            /** Delete this from the store, same as just removing it from the locationsOrder */
                            runInAction(() => {
                                store.locationOrder.clear();
                            });
                        }}    
                    >
                        <DeleteIcon />
                    </IconButton>
                    </Tooltip>
                </Stack>
            </AppBar>
        </Box>
    );
});

export default NavBar;