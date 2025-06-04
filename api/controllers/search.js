import { db } from "../connect.js";

export const searchUser = (req, res) => {
  const params = req.query.params + "%";

  if (!params) {
    return res.status(422).json({ msg: "Precisamos dos parâmetro" });
  }

  db.query(
    "SELECT username, userImg, id FROM users WHERE username LIKE ?",
    [params],
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

export const searchPost = (req, res) => {
  const params = "%" + req.query.params + "%";

  if (!params) {
    return res.status(422).json({ msg: "Precisamos dos parâmetro" });
  }

  db.query(
"SELECT p.*, u.username, userImg FROM posts as p JOIN users as u ON(u.id = p.userId) WHERE p.post_desc LIKE ? OR u.username LIKE ? ORDER BY created_at DESC",
    [params, params],
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
