import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppContext from "./app-context";
import AppStore from "./stores/app";
import AppApi from "./apis/app";

import HomePage from "./pages/home";

const store = new AppStore();
const api = new AppApi(store);

function App() {
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