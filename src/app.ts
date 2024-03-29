import express, { NextFunction, Request, Response, Application } from "express";
import dotenv from "dotenv";
import http from "http";
import mongoose from "mongoose";
import userRoutes  from "./routes/user.routes";

dotenv.config();
const app: Application = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello from the app");
});

const mongoUrl = process.env.DATABASE_URL || "";
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB");
    StartServer();
  })
  .catch((error) => {
    console.log(error);
  });

const StartServer = () => {
  app.use(express.json());

  app.use("/user", userRoutes);

  http.createServer(app).listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
  });
};

export default app;