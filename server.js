const express = require("express");
const proxy = require("express-http-proxy");
const path = require("path");
const app = express();
const cors = require("cors");
const assert = require("assert");
const axios = require("axios");

const exampleWeatherData = require("./openweatherapi-example.json");
const exampleGeolocationData = require("./opengeolocationapi-example.json");
const exampleGeolocationDirectData = require("./opengeolocationdirectapi-example.json");

/** Get port */
require("dotenv").config({ path: "./.env.local" });
const port = process.env.REACT_APP_SERVER_PORT || 6005;
const apikey = process.env.NODE_ENV_OPEN_WEATHER_API_KEY;
assert(port);

/** Use Json */
app.use(cors());
app.use(express.json());

/** Load public static files */
// app.use("/static", express.static(path.join(__dirname, "public")))

/** Api proxy route; TODO: check for spam */
const apiRoutes = express.Router();

/** Api test */
apiRoutes.route("/").get(function (req, res) {
    res.send("Hello this is the api");
});

/** Proxy the request failed attempt */
// apiRoutes.route("/openweatherapi").get(function (req, res) {
    
// });
// apiRoutes.use("/openweatherapi", proxy("https://api.openweathermap.org/data/3.0/onecall", {
//     /** From https://www.npmjs.com/package/express-http-proxy */
//     https: true,
//     proxyReqPathResolver: function (req) {
//         const parts = req.url.split('?');
//         const queryString = '?appid=key' + (parts[1] ? parts[1] : '');
//         // return parts[0] + queryString;
//         console.log("what", req.url);
//         console.log(parts[0] + queryString);
//         req.url = "https://api.openweathermap.org/data/3.0/onecall";
//         // return parts[0] + queryString;
//         return "https://api.openweathermap.org/data/3.0/onecall";
//     },
// }));

/** Creating another request */
apiRoutes.use("/openweatherapi/*", async (req, res, next) => {
    let query = "?appid=" + apikey;
    const proxyQuery = req.url.split('?')[1];
    query += proxyQuery ? '&' + proxyQuery : '';
    const fullUrl = "https://api.openweathermap.org/" + req.params[0] + query;

    try {
        const owaRes = await axios.get(fullUrl);
        /** So that I don't spam API calls */
        let data = {}
        switch (req.params[0]) {
            case "geo/1.0/direct":
                data = exampleGeolocationDirectData;
                break;
            case "geo/1.0/reverse":
                data = exampleGeolocationData;
                break;
            default:
                data = exampleWeatherData
                break;
        }

        // const owaRes = {
        //     data: data
        // };
        res.json(owaRes.data);
    } catch (err) {
        /** Axios throws error if the response isn't a good code */
        res.json(err);
    }
});
app.use("/api", apiRoutes);

/** Serve the frontend */
const isDevelopmentMode = app.get("env") === "development";
if (isDevelopmentMode){
    console.log("DEVELOPMENT MODE");
    app.use("/", proxy("http://127.0.0.1:3000"));
    // app.use("/*", proxy("http://127.0.0.1:3000"));
} else {
    app.use(express.static(path.join(__dirname, "build")));
    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, "build", "index.html"));
    });
}

/** Start the server */
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});