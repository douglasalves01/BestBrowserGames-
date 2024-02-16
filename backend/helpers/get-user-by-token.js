import jwt from "jsonwebtoken";
import { client } from "../db/conn.js";

export const getUserByToken = async (token) => {
  if (!token) {
    return res.status(401).json({ message: "Acesso Negado!" });
  }
  const decoded = jwt.verify(token, "nossosecret");
  const userEmail = decoded.email;
  const user = await client
    .db("best-browser-games")
    .collection("users")
    .findOne({
      email: userEmail,
    });
  return user;
};
