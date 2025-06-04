import { db } from "../connect.js";

export const getUser = (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(422).json({ msg: "Precisamos do id do usuário" });
  }

  db.query(
    "SELECT username, userImg, bgImg FROM users WHERE id=?",
    [id],
    (error, data) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({
            msg: "Aconteceu um problema no servidor, tente novamente mais tarde!",
          });
      } else {
        return res.status(200).json(data);
      }
    }
  );
};

export const updateUser = (req, res) => {
  const { username, userImg, bgImg, id } = req.body;

  if (!username || !userImg || !bgImg) {
    return res.status(422).json({ msg: "Sem alterações para serem feitas!" });
  }

  db.query(
    "UPDATE users SET username = ?, userImg = ?, bgImg = ? WHERE id = ?",
    [username, userImg, bgImg, id],
    (error, data) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({
            msg: "Aconteceu um problema no servidor, tente novamente mais tarde!",
          });
      } else if (data.affectedRows > 0) {
        return res.status(200).json({ msg: "Atualizado com sucesso!" });
      }
    }
  );
};
