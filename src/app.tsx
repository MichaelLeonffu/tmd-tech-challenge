import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { reaction, runInAction } from "mobx";
import { useCookies } from "react-cookie";
import AppContext from "./app-context";
import AppStore from "./stores/app";
import AppApi from "./apis/app";
import HomePage from "./pages/home";
import ILatLon from "./types/latlon";

const api = new AppApi();
const store = new AppStore(api);

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

            store.requestWeather(latLon);
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
            <AppContext.Provider value={{ store, api }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<HomePage />} />
                    </Routes>
                </BrowserRouter>
            </AppContext.Provider>
        </div>
    );
}

export default App;