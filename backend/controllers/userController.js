import bcrypt from "bcrypt";
import { client } from "../db/conn.js";
import { createUserToken } from "../helpers/create-user-token.js";
export class UserController {
  static async register(req, res) {
    const { name, email, password, country, state, birthDate } = req.body;

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }
    if (!email) {
      res.status(422).json({ message: "O email é obrigatório" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "A senha é obrigatório" });
      return;
    }
    if (!state) {
      res.status(422).json({ message: "O Estado é obrigatório!" });
      return;
    }
    if (!country) {
      res.status(422).json({ message: "O país é obrigatório!" });
      return;
    }
    if (!birthDate) {
      res.status(422).json({ message: "A data de nascimento é obrigatória!" });
      return;
    }
    try {
      //checar se o usuário já existe
      const registroExistente = await client
        .db("best-browser-games")
        .collection("users")
        .findOne({ email });
      if (registroExistente) {
        res.status(422).json({ message: "Por favor, utilize outro email!" });
        return;
      }
      //criar a senha
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);
      //registrar o usuário
      const newUser = {
        name,
        email,
        password: passwordHash,
        country,
        state,
        birthDate,
      };

      await client
        .db("best-browser-games")
        .collection("users")
        .insertOne(newUser);

      res.status(201).json({ message: "Usuário registrado com sucesso!" });
    } catch (error) {
      res.status(422).json({ message: error.message });
    }
  }
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: "O email é obrigatório" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória" });
      return;
    }

    try {
      //checar se o usuário já existe
      const registroExistente = await client
        .db("best-browser-games")
        .collection("users")
        .findOne({ email });
      if (!registroExistente) {
        res.status(422).json({ message: "Por favor, utilize outro email!" });
        return;
      }

      //checar senha inserida com senha do banco(hash)
      const checkPassword = await bcrypt.compare(
        password,
        registroExistente.password
      );
      if (!checkPassword) {
        res.status(422).json({ message: "Senha inválida" });
        return;
      }
      await createUserToken(registroExistente.email, req, res);
    } catch (error) {
      res.status(422).json({ message: error.message });
    }
  }
}
