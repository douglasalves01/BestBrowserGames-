import jwt from 'jsonwebtoken';

export const createUserToken = async (email, acesso, req, res) => {
  const token = jwt.sign(
    {
      email: email,
      acesso: acesso,
    },
    'nossosecret'
  );
  res.status(200).json({
    message: 'Você está autenticado',
    token: token,
    email: email,
    acesso: acesso,
  });
};
