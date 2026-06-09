import "dotenv/config";
import express, { type Application } from "express";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import { config } from "./config";

const app: Application = express();

app.use(express.json());

//routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

//error handling - must be last
app.use(notFound);
app.use(errorHandler);

app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
