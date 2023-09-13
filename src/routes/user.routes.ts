import express from "express";
import controller from "../controllers/user.controllers";

const router = express.Router();

router.post("/register", controller.registerUser);

export = router;
