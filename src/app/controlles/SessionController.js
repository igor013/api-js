import Jwt from 'jsonwebtoken';
import authConf from '../../config/Auth';
import User from "../models/User.js";
class SessionController {
    async store(req, res) {
        const { mail, password } = req.body;
        console.log("cheguei aquiiiiiiiiii,",req.body);
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
            
            // console.log("LOGGGGGG", authConf)

            const {id} = fulano;
            let token = Jwt.sign({id}, authConf.secret ,{expiresIn:authConf.expiresIn});
            return res.status(200).json({user:fulano,token:token});

        } catch (error) {
            console.log("error", error)

        }
    }



}
export default new SessionController();