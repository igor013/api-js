import { Request, Response } from 'express';
import Sequelize from "sequelize";

class HomeController {
    async index(req: Request, res: Response) {
        try {

            return res.status(200).json({ message: "Serviço em operaçao" })
        } catch (error) {
            // console.log("ocorreu um erro", error)
            return res.status(400).json({ error: "ocorreu um erro" })

        }
    }



}
export default new HomeController();