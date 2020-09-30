import {Router} from "express";
import HomeController from "./app/controlles/HomeController.js"
const routes = new Router();

routes.get("/", HomeController.index);

export default routes;