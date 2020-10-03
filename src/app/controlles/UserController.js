import Sequelize from "sequelize";
import User from "../models/User";
import Address from "../models/Address";

class UserController {
    async index(req, res) {
        try {
            let users = await User.findAll();

            return res.status(200).json(users)
        } catch (error) {
            // console.log("ocorreu um erro", error)
            return res.status(400).json({ error: "ocorreu um erro" })

        }
    }
    async store(req, res) {

        if (!req.body) {
            return res.status(400).json({ error: "Nenhum dado enviado" })
        }
        try {
            let user = await User.create(req.body);
            return res.status(201).json({ message: "Usuario cadastrado", data: user })
        } catch (error) {
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

        try {
            const { id } = req.params
            let user = await User.findByPk(id);
            await user.destroy();
            return res.status(200).json({ message: "Usuario deletado com sucesso" })
        } catch (error) {
            return res.status(400).json({ error: "ocorreu um erro" })
        }
    }

   


}
export default new UserController();