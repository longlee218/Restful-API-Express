require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const morganMiddleware = require("./morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const {
    countryRoutes,
    vocalnoRoutes,
    userRoutes,
    meRoutes,
} = require("./routes");
const swaggerUiExpress = require("swagger-ui-express");
const swaggerDocs = require("./swagger");

const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

/**
 * App Variables
 */
const port = normalizePort(process.env.PORT || "3001");
const app = express();
app.set("port", port);

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
        default:
            throw error;
    }
};

const onListenning = () => {
    const addr = httpServer.address();
    const bind =
        typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.log("[express] listening on " + bind);
};

const errorHandle = (error, req, res, next) => {
    const isDevelop = process.env.MODE === "develop";
    console.log("error");
    if (isDevelop) {
        return res.status(500).json({ msg: error.message, stacks: error });
    }
    return res.status(500).json({ msg: "Oops something went wrong!" });
};

/**
 * Server Activation
 */
const httpServer = http.createServer(app);
httpServer.listen(port);
httpServer.on("listening", onListenning);
httpServer.on("error", onError);

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors({ origin: true, optionsSuccessStatus: 200 }));
app.use(morganMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    next();
});

/**
 * Swagger UI
 */
app.use(
    "/api-docs",
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(swaggerDocs)
);
/**
 *  App routes
 */
app.get("/", (req, res) => res.send("ok"));
app.use(countryRoutes);
app.use(vocalnoRoutes);
app.use(userRoutes);
app.use(meRoutes);
/**
 * Catch error process
 */
process.on("uncaughtException", (err) => {
    console.log("Error process: " + err);
});
