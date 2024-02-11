import jwt from "jsonwebtoken";

export const createUserToken = async (email, req, res) => {
  const token = jwt.sign(
    {
      email: email,
    },
    "nossosecret"
  );
  res.status(200).json({
    message: "Você está autenticado",
    token: token,
    email: email,
  });
};
