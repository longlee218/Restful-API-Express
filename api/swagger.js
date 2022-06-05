const swaggerJsdoc = require("swagger-jsdoc");

module.exports = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
    },
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Volcanoes around the world v2",
            version: "2.0.0",
            description: "",
        },
    },
    apis: ["./routes/*.route.js"],
});
