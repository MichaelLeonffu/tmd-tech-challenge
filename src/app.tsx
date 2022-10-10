import { BrowserRouter, Route, Routes } from "react-router-dom";

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