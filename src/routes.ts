import {Router} from "express";
import HomeController from "./app/controllers/HomeController"
import UserController from "./app/controllers/UserController";
import AddressController from "./app/controllers/AddressController";
import SessionController from "./app/controllers/SessionController";

const routes: Router = Router();

routes.get("/", HomeController.index);
routes.post("/sessions", SessionController.store);

routes.get("/users", UserController.index);
routes.get("/usersdel", UserController.listusersdel);
routes.post("/users", UserController.store);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.destroy);


routes.get("/address", AddressController.index);
routes.post("/address", AddressController.store);
routes.put("/address/:id", AddressController.update);
routes.delete("/address/:id", AddressController.destroy);

export default routes;