import express from "express";
import cors from "cors";
import routes from "./routes.js";
import "./database/index"


class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.server.use(cors());
        this.server.use(function (req, res, next) {
            res.status(404).send("Não encontrado a rota digitada!")
        });

    }



    routes() {
        this.server.use(routes);
    }

}
export default new App().server
