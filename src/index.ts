import "dotenv/config";
import express, { type Application } from "express";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import storyRoutes from "./routes/story.routes";
import characterRoutes from "./routes/character.routes";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import { config } from "./config";
import uploadRoutes from "./routes/upload.routes";
import messageRoutes from "./routes/message.routes";
import threadRoutes from "./routes/thread.routes";

const app: Application = express();

app.use(express.json());

app.get("/health", (_req, res) => {
	res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

//routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/stories", storyRoutes);
app.use("/stories/:storyId/characters", characterRoutes);
app.use("/upload", uploadRoutes);
app.use("/stories/:storyId/threads/:threadId/messages", messageRoutes);
app.use("/stories/:storyId/threads", threadRoutes);

//error handling - must be last
app.use(notFound);
app.use(errorHandler);

app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
