import express, { Express, NextFunction, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
// import { version } from '../package.json'

const app: Express = express();

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Minglr API Docs",
            version: "1.0.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            // license: {
            //   name: "MIT",
            //   url: "https://spdx.org/licenses/MIT.html",
            // },
            // contact: {
            //   name: "LogRocket",
            //   url: "https://logrocket.com",
            //   email: "info@email.com",
            // },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

export function swaggerDocs(app: Express, port: number) {
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs, {
            explorer: true,
            // customCssUrl: "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
        })
    );
}