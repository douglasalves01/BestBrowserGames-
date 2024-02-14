import { client } from "../db/conn.js";
export class GamesController {
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
  static async updateGames(req, res) {}
  static async deleteGames(req, res) {
    const id = req.params.id;

    //verificar se a todo a ser removida foi tem o iduser do usuario logado
    const token = getToken(req);
    const user = await getUserByToken(token);

    const todoSql = "select * from todo where id=$1 and iduser=$2";
    const todoUserExists = await conn.query(todoSql, [id, user.id]);

    if (todoUserExists.rows.length === 0) {
      res.status(500).json({
        message:
          "Houve um problema ao deletar a nota! Tente novamente mais tarde!",
      });
      return;
    }
    const deleteSql = "delete from todo where id=$1";
    try {
      await conn.query(deleteSql, [id]);
      res.status(200).json({ message: "Game deletado com sucesso!" });
    } catch (error) {
      res.status(422).json({ message: error.message });
    }
  }
}
