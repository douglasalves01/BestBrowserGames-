import { getToken } from '../helpers/get-token.js';
import { getUserByToken } from '../helpers/get-user-by-token.js';
import { client } from '../db/conn.js';
export class AvaliateController {
  static async avaliate(req, res) {
    //pegar id do game a ser avaliado
    const idGame = req.params.id;
    const { avaliate, comentario } = req.body;

    if (!avaliate) {
      res.status(422).json({ message: 'A avaliação do game é obrigatória!' });
      return;
    }
    //pegar id do usuário
    const token = getToken(req);
    const user = await getUserByToken(token);
    const idUser = user._id.toString();

    //avaliação de 1 a 5 estrelas
    const newAvaliate = {
      avaliate,
      comentario,
      idGame,
      idUser,
    };
    try {
      await client.db('best-browser-games').collection('avaliate').updateOne(
        { idGame, idUser }, // Filtro para encontrar a avaliação existente
        { $set: newAvaliate }, // Documento a ser atualizado ou inserido
        { upsert: true } // Opção para inserir se não existir (upsert)
      );

      res.status(200).json({ message: 'Avaliação feita com sucesso!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async getAvaliate(req, res) {
    const idGame = req.params.id;
    //pegar id do usuário
    const token = getToken(req);
    const user = await getUserByToken(token);
    const idUser = user._id.toString();
    try {
      const data = await client
        .db('best-browser-games')
        .collection('avaliate')
        .find({ idUser: idUser, idGame: idGame })
        .toArray();
      //console.log(data.data);
      res.status(200).json({ message: 'Busca concluída', data: data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async getAll(req, res) {
    const idGame = req.params.id;
    //pegar id do usuário
    const token = getToken(req);
    const user = await getUserByToken(token);
    const idUser = user._id.toString();
    try {
      const data = await client
        .db('best-browser-games')
        .collection('avaliate')
        .find({ idGame: idGame })
        .toArray();
      //console.log(data.data);
      res.status(200).json({ message: 'Busca concluída', data: data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
