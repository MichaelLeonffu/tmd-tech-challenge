import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { reaction } from "mobx";
import { useCookies } from "react-cookie";
import AppContext from "./app-context";
import AppStore from "./stores/app";
import AppApi from "./apis/app";
import HomePage from "./pages/home";

const api = new AppApi();
const store = new AppStore(api);

function App() {

    /** Create a cookie store */
    const [cookie, setCookie] = useCookies(["store"]);

    /** Load any initial cookies, ONLY RUN ONCE on mount. Wait why does this run twice */
    useEffect(() => {
        console.log("Initial cookies", cookie.store);
        (async () =>{
            /** Causes some issues since it thinks it's not an "action" changing an observable */
            store.storeFromCookies(cookie.store);
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /** Save to Cookies on change in store */
    reaction(() => store.serialCookieStore, serialCookieStore => {

        console.log("store changed: ", serialCookieStore);
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