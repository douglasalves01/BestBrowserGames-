import { client } from "../db/conn.js";
import { MongoClient, ObjectId } from "mongodb";
export class GamesController {
  static async getAllGames(req, res) {
    try {
      const data = await client
        .db("best-browser-games")
        .collection("games")
        .find()
        .toArray();
      console.log(data);
      res.status(200).json({ message: "Busca concluída", data: data.rows });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async createGames(req, res) {
    const { nome, categoria, urlAcesso, urlVideo, descricao, image } = req.body;
    if (!nome) {
      res.status(422).json({ message: "O nome do jogo é obrigatório!" });
      return;
    }
    if (!categoria) {
      res.status(422).json({ message: "A categoria é obrigatória!" });
      return;
    }
    if (!urlAcesso) {
      res
        .status(422)
        .json({ message: "A URL de acesso ao jogo é obrigatória!" });
      return;
    }

    if (!descricao) {
      res.status(422).json({ message: "A descrição é obrigatória" });
      return;
    }
    if (!image) {
      res.status(422).json({ message: "A imagem é obrigatória" });
      return;
    }
    try {
      //regitro de games
      const newGame = {
        nome,
        categoria,
        urlAcesso,
        urlVideo,
        descricao,
        image,
      };

      await client
        .db("best-browser-games")
        .collection("games")
        .insertOne(newGame);

      res.status(201).json({ message: "Game registrado com sucesso!" });
    } catch (error) {
      res.status(422).json({ message: error.message });
    }
  }
  static async updateGames(req, res) {
    const id = req.params.id;
    const { nome, categoria, urlAcesso, urlVideo, descricao, image } = req.body;
    //regitro de games
    const newGame = {
      nome,
      categoria,
      urlAcesso,
      urlVideo,
      descricao,
      image,
    };

    try {
      await client
        .db("best-browser-games")
        .collection("games")
        .updateOne({ _id: new ObjectId(id) }, { $set: newGame });
      res.status(200).json({ message: "Game atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async deleteGames(req, res) {
    const id = req.params.id;

    try {
      const result = await client
        .db("best-browser-games")
        .collection("games")
        .deleteOne({ _id: new ObjectId(id) });
      if (result) {
        res.status(200).json({ message: "Game deletado com sucesso!" });
      }
    } catch (error) {
      res.status(422).json({ message: error.message });
    }
  }
}
