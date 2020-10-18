import express from "express";
import cors from "cors";
import routes from "./routes.js";
import "./database/index"

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

//Implementacao de Middleware para Rotas Invalidas
// comentario Gill
    app.use(function (req, res, next) {
        res.status(404).send("Não encontrado a rota digitada!")
    })

export default app;