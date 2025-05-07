import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export const checkRefreshToken = (req, res, next) => {
  const authHeader = req.headers.cookie?.split("; ")[1];
  const refresh = authHeader && authHeader.split("=")[1];

  if (refresh) {
    try {
      jwt.verify(refresh, process.env.REFRESH);
      next();
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Token inválido" });
    }
  } else {
    return res.status(401).json({ msg: "Acesso Negado!" });
  }
};
