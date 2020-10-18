import { Request, Response } from 'express';
import Sequelize from "sequelize";
import Address from "../models/Address";

class AddressController {

  async index(req: Request, res: Response) {
    try {
      let addresses = await Address.findAll();

      return res.status(200).json(addresses)
      // return res.status(200).json({ message: "Serviço em operaçao" });
    } catch (error) {
      // console.log("ocorreu um erro", error)
      return res.status(400).json({ error: "ocorreu um erro" });
    }
  }



  async store(req: Request, res: Response) {
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



  async update(req: Request, res: Response) {
    try {
      return res.status(200).json({ message: "Serviço em operaçao" });
    } catch (error) {
      // console.log("ocorreu um erro", error)
      return res.status(400).json({ error: "ocorreu um erro" });
    }
  }
  async destroy(req: Request, res: Response) {
    try {
      return res.status(200).json({ message: "Serviço em operaçao" });
    } catch (error) {
      // console.log("ocorreu um erro", error)
      return res.status(400).json({ error: "ocorreu um erro" });
    }
  }



}
export default new AddressController();