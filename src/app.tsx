import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { reaction, runInAction } from "mobx";
import { useCookies } from "react-cookie";
import AppContext from "./app-context";
import AppStore from "./stores/app";
import AppApi from "./apis/app";
import HomePage from "./pages/home";
import ILatLon from "./types/latlon";

// Making themes
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const api = new AppApi();
const store = new AppStore(api);

// https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=FFB74D&secondary.color=81D4FA
// https://www.welcomedeveloper.com/react-mui-theme
const appTheme = createTheme({
  palette: {
    primary: {
      light: '#ffe97d',
      main: '#ffb74d',
      dark: '#c88719',
      contrastText: '#000',
    },
    secondary: {
      light: '#b6ffff',
      main: '#81d4fa',
      dark: '#4ba3c7',
      contrastText: '#000',
    },
  },
});

function App() {

    /** Create a cookie store */
    const [cookie, setCookie] = useCookies(["store"]);

    useEffect(() => {
        /** Prompt user for their geolocation */
        if (!("geolocation" in navigator)) {
            return;
        }

        /** This fails silently if the location is not found (e.g wifi is off) */
        navigator.geolocation.getCurrentPosition(( pos ) => {
            const latLon: ILatLon = {lat: pos.coords.latitude, lon: pos.coords.longitude};

            /** May cause a race condition: */
            console.log("attempting to find weather for your area: ", latLon);

            /** Track that is the user's location */
            runInAction(() => {
                store.requestWeather(latLon);
                store.myLocationLatLon = latLon;
            });
        });

        /** Load any initial cookies, ONLY RUN ONCE on mount. Wait why does this run twice */
        console.log("Initial cookies", cookie.store);
        store.storeFromCookies(cookie.store);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /** Save to Cookies on change in store */
    reaction(() => store.serialCookieStore, serialCookieStore => {
        setCookie("store", serialCookieStore);
    });

    return (
        <div>
            <ThemeProvider theme={appTheme}>
                <AppContext.Provider value={{ store, api }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/*" element={<HomePage />} />
                        </Routes>
                    </BrowserRouter>
                </AppContext.Provider>
            </ThemeProvider>
        </div>
    );
}

export default App;