import { Request, Response } from 'express';
// import Sequelize from "sequelize";
import User from "../models/User.js";
class SessionController {
    async store(req: Request, res: Response) {
        const { mail, password } = req.body;
        //    console.log(mail)
try {
    const fulano = await User.findOne({
        // attributes: ['id', 'name', 'mail', 'age', 'status'],
        where: {
            mail: mail
        }
    });
    if (!fulano) { return res.status(400).json({ message: "email nao encontrado" }) }
    let isvalid = await fulano.checkPassword(password);
    
    if (!isvalid) {
        return res.status(400).json({ message: "senha invalida" })
    }

    return res.json(fulano)

} catch (error) {
    console.log("error", error)
    
}
    }



}
export default new SessionController();