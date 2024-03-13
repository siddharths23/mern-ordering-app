import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("connected to database"));

//creates new express server
const app = express();

app.use(express.json()); //automatically converts the req body to json
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

app.use("/api/my/user", myUserRoute);

// app.get("/test", async (req: Request, res: Response) => {
//   res.json({ message: "Hello!" }); // returns json res when gets req
// });
app.listen(7000, () => {
  //callback fn executes when 7000 server started
  console.log("server started on localhost:7000");
});
