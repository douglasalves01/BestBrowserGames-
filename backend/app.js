import express from "express";
import cors from "cors";
import { run } from "./db/conn.js";
import { userRouter } from "./routes/userRoutes.js";
import { gamesRouter } from "./routes/gamesRoutes.js";
import { avaliateRouter } from "./routes/avaliateRoutes.js";

const app = express();

app.use(cors());
app.use(
  //configurando o express para pegar o body
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use("/", userRouter);
app.use("/", gamesRouter);
app.use("/", avaliateRouter);
run();

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`https://localhost:3000`);
});
