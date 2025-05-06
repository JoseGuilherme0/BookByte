import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use("/api/auth",authRouter);
app.use("/api/post", postRouter);

app.listen(8001, ()=>{
    console.log("Servidor rodando na porta 8001!!!")
});
