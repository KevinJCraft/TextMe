import "dotenv/config";
import express, { type Application, type Request, type Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import userRoutes from "./routes/user.routes";
import { prisma } from "./lib/prisma";

const app: Application = express();
const adapter = new PrismaPg({ connectionString: process.env["DATABASE_URL"] });
const port = 3001;

app.use(express.json());

app.use("/users", userRoutes);

app.listen(port, () => console.log("Server running on port " + port));
