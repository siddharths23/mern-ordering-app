import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

//creates new express server
const app = express();

app.use(express.json()); //automatically converts the req body to json
app.use(cors());

app.get("/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello!" }); // returns json res when gets req
});
app.listen(7000, () => {
  //callback fn executes when 7000 server started
  console.log("server started on localhost:7000");
});
