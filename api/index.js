import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import searchRouter from "./routes/search.js";
import commentRouter from "./routes/comment.js";
import friendshipRouter from "./routes/friendship.js";
import likeRouter from "./routes/like.js";
import uploadRouter from "./routes/upload.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Credentials",
  ],
};

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/user/", userRouter);
app.use("/api/auth/", authRouter);
app.use("/api/post/", postRouter);
app.use("/api/search/", searchRouter);
app.use("/api/comment/", commentRouter);
app.use("/api/like/", likeRouter);
app.use("/api/friendship/", friendshipRouter);
app.use("/api/upload/", uploadRouter);

app.listen(8001, () => {
  console.log("Servidor rodando na porta 8001!!!");
});
