import express from "express";
import cors from "cors";
import type { Request, Response } from "express";

import authRouter from "./router/auth";

const app = express();

app.use(
  cors({
    origin: ["https://www.localhost.:5000"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);

app.get("/api", (req: Request, res: Response) => {
  res.send("hellow shubham");
});

app.get("/hell", (req: Request, res: Response) => {
  res.status(200).send("hellow");
});

async function StartServer() {
  try {
    app.listen(8000, () => {
      console.log("server on 8000 port");
    });
  } catch {
    console.log("not able to start server");
  }
}

StartServer();

export default app;

