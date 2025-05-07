import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export const checkToken = (req, res, next) => {
  const authHeader = req.headers.cookie?.split("; ")[1];
  const token = authHeader && authHeader.split('=')[1];

  if (token) {
    try {
      jwt.verify(token, process.env.TOKEN);
      next();
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Token inválido" });
    }
  } else {
    return res.status(401).json({ msg: "Acesso Negado!" });
  }
};
