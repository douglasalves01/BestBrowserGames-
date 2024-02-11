import jwt from "jsonwebtoken";

export const createUserToken = async (email, req, res) => {
  const token = jwt.sign(
    {
      email: email,
    },
    "nossosecret"
  );
  res.status(200).json({
    message: "Você está atutenticado",
    token: token,
    email: email,
  });
};