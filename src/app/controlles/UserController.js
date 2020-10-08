import Sequelize from "sequelize";
import User from "../models/User";
import Address from "../models/Address";

class UserController {
    async index(req, res) {
        let fleag = req.query.status; 
        if (!fleag){
            fleag = "A"
        }

        try {
            let users = await User.findAll({
                where:{status: fleag},
                include: [
                    {
                        model: Address, 
                        as: 'address', 
                        attributes:['address01', 'address02', 'reference', 'zipcode', 'state', 'city']

                    }
                ]
            });

            return res.status(200).json(users)
        } catch (error) {
            console.log("ocorreu um erro", error)
            return res.status(400).json({ error: "ocorreu um erro" })

        }
    }
    async store(req, res) {

        if (!req.body) {
            return res.status(400).json({ error: "Nenhum dado enviado" })
        }
        let userexists = await User.findOne({where:{mail:req.body.mail}});
        if (userexists){
            return res.status(400).json({ error: "ja existe usuario com esse email" })

        }
        
        try {
            await User.create(req.body);
            return res.status(201).json({ message: "Usuario cadastrado" })
        } catch (error) {
            console.log("error", error)
            return res.status(400).json({ error: "ocorreu um erro" })
        }
    }
    async update(req, res) {
        if (!req.body) {
            return res.status(400).json({ error: "Nenhum dado enviado" })
        }

        try {
            const { id } = req.params
            let user = await User.findByPk(id);
            let userupdated = await user.update(req.body);
            return res.status(200).json({ message: "Atualizado com sucesso", data: userupdated })
        } catch (error) {
            return res.status(400).json({ error: "ocorreu um erro" })
        }
    }
    async destroy(req, res) {
        if (!req.params.id) {
            return res.status(400).json({ error: "Nenhum  enviado" })
        }

        const { id } = req.params
        let userexists= await User.findByPk(id);
        if(!userexists){
            return res.status(400).json({ error: "usuario nao encontrado para exclusao" })

        }
        try {
            // await user.destroy();
            await userexists.update({status:'D'});
            return res.status(200).json({ message: "Usuario deletado com sucesso" })
        } catch (error) {
            console.log('error', error)
            return res.status(400).json({ error: "ocorreu um erro" })
        }
    }

    async listusersdel(req, res) {
        try {
           let G = await User.findAll({
               where:{
                   status: 'D'
                }
            }) 
             return res.status(200).json(G)
        } catch (error) {
            return res.status(400).json({ error: "ocorreu um erro" })
    
        }
    }

   


}
export default new UserController();