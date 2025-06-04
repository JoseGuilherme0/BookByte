import express from "express";
import { addLike, getLike, deleteLike } from "../controllers/like.js";
import { checkToken } from "../middleware/tokenValidation.js"

const router = express.Router();

router.post("/", checkToken, addLike);
router.get("/", checkToken, getLike);
router.delete("/", checkToken, deleteLike)


export default router;
