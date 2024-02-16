import { client } from "../db/conn.js";
export class CategoriaController {
  static async create(req, res) {
    const categoria = req.body;
    if (!categoria) {
      res.status(422).json({ message: "A categoria é obrigatória!" });
      return;
    }
    try {
      await client
        .db("best-browser-games")
        .collection("categoria")
        .insertOne(categoria);

      res.status(201).json({ message: "Categoria registrada com sucesso!" });
    } catch (error) {
      res.status(422).json({ message: error.message });
    }
  }
}
