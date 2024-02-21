import { client } from "../db/conn.js";
import { MongoClient, ObjectId } from "mongodb";
export class CategoriaController {
  static async getAll(req, res) {
    try {
      const data = await client
        .db("best-browser-games")
        .collection("categoria")
        .find()
        .toArray();

      res.status(200).json({ message: "Busca concluída", data: data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async create(req, res) {
    const { categoria } = req.body;
    if (!categoria) {
      res.status(422).json({ message: "A categoria é obrigatória!" });
      return;
    }
    try {
      await client
        .db("best-browser-games")
        .collection("categoria")
        .insertOne({ categoria });

      res.status(201).json({ message: "Categoria registrada com sucesso!" });
    } catch (error) {
      res.status(422).json({ message: error.message });
    }
  }
  static async delete(req, res) {
    const id = req.params.id;

    try {
      const result = await client
        .db("best-browser-games")
        .collection("categoria")
        .deleteOne({ _id: new ObjectId(id) });

      if (result) {
        res.status(200).json({ message: "Categoria deletada com sucesso!" });
      }
    } catch (error) {
      res.status(422).json({ message: error.message });
    }
  }
}
