import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppContext from "./app-context";
import AppStore from "./stores/app";
import AppApi from "./apis/app";

import { CookiesProvider } from "react-cookie";
import { useCookies } from "react-cookie";
import { autorun, values, entries} from "mobx";

import HomePage from "./pages/home";

const store = new AppStore();
const api = new AppApi(store);

const deferred = {
    setCookieDeferred: (value: string): void => {},
    getCookieDeferred: (): string => {return "no value yet"}
}

function App() {

    const [cookie, setCookie, removeCookie] = useCookies(["store"]);

    // function handleCookie() {
    //     setCookie("user", "larypie", {
    //         path: "/"
    //     });
    // }

    deferred.setCookieDeferred = (value) => {
        removeCookie("store")
        setCookie("store", value, {path: '/'});
    }

    deferred.getCookieDeferred = () => {
        return cookie.store;
    }

    return (
        <div>
            <CookiesProvider>
                {/* <div>
                    <h1>React Cookies</h1>
                    <button onClick={handleCookie}>Set Cookie</button>
                </div> */}
                <AppContext.Provider value={{ store, api }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/*" element={<HomePage />} />
                        </Routes>
                    </BrowserRouter>
                </AppContext.Provider>
            </CookiesProvider>
        </div>
    );
}

/** Save to Cookies on change */
autorun(() =>  {
    return;
    /** I know this isn't the best code; but I need to move on from this */
    values(store.localWeathers);
    values(store.geolocations);
    values(store.locations);
    values(store.locationOrder);

    console.log("store changed: ", values(store));

    const simple = {lol: "easy", count: store.localWeathers.size};
    const cop = {
        localWeathers: entries(store.localWeathers),
        // geolocations: entries(store.geolocations),
        // locations: entries(store.locations),
        // locationOrder: entries(store.locationOrder),
    }

    let save = simple;

    console.log("stringed", save);
    console.log("ssss", JSON.stringify(save));
    deferred.setCookieDeferred(JSON.stringify(save));
    console.log("mycookies", deferred.getCookieDeferred());
});

export default App;