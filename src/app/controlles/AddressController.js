import Sequelize from "sequelize";
import Address from "../models/Address";

class AddressController {

  async index(req, res) {
    try {
      let addresses = await Address.findAll();

      return res.status(200).json(addresses)
      // return res.status(200).json({ message: "Serviço em operaçao" });
    } catch (error) {
      // console.log("ocorreu um erro", error)
      return res.status(400).json({ error: "ocorreu um erro" });
    }
  }



  async store(req, res) {
    // console.log(req.body);
    if (!req.body) {
      return res.status(400).json({ message: "Dados não existente!" });
    }
    try {
      await Address.create(req.body);
      return res.status(201).json({ message: "Endereço cadastrado!" });
    } catch (error) {
      // console.log("ocorreu um erro", error)
      return res.status(400).json({ error: "ocorreu um erro" });
    }

  }



  async update(req, res) {
    try {
      return res.status(200).json({ message: "Serviço em operaçao" });
    } catch (error) {
      // console.log("ocorreu um erro", error)
      return res.status(400).json({ error: "ocorreu um erro" });
    }
  }
  async destroy(req, res) {
    try {
      return res.status(200).json({ message: "Serviço em operaçao" });
    } catch (error) {
      // console.log("ocorreu um erro", error)
      return res.status(400).json({ error: "ocorreu um erro" });
    }
  }



}
export default new AddressController();