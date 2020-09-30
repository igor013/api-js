import Sequelize from "sequelize";
import User from "../models/User";

class HomeController {
    async index(req, res) {
       try {
        let users = await User.findAll();

        return res.status(200).json(users)
    } catch (error) {
        console.log("ocorreu um erro", error)
        return res.status(400).json({error:"ocorreu um erro"})
           
       }
    }



}
export default new HomeController();