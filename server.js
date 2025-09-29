import express from "express";
import dotenv from "dotenv";
import Router from "./src/routes/bruxosRoutes.js"
import bruxos from "./src/models/dados.js";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3001;

app.get("/", (req,res) => {
    res.send(bruxos)
})

app.use("/Bruxos", Router);

app.listen(serverPort, () => {
    console.log(`🚀 O servidor está funcionando nesse link aqui: http://localhost:${serverPort} 🚀`);
});