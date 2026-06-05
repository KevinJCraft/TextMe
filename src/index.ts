import "dotenv/config";
import express, { type Application, type Request, type Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import userRoutes from "./routes/user.routes";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";

const app: Application = express();
const adapter = new PrismaPg({ connectionString: process.env["DATABASE_URL"] });
const port = 3001;

app.use(express.json());

//routes
app.use("/users", userRoutes);

//error handling - must be last
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log("Server running on port " + port));
