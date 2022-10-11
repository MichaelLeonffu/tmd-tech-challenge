import { BrowserRouter, Route, Routes } from "react-router-dom";

console.log(process.env.REACT_APP_DEV_CLIENT_PORT);

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<p>home page!</p>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;