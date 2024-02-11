import express from "express";
import cors from "cors";
import { run } from "./db/conn.js";
import { userRouter } from "./routes/userRoutes.js";

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
run();

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`https://localhost:3000`);
});
