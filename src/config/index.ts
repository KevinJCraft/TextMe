import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
	PORT: z.string().optional(),
	DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
	JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
	NODE_ENV: z.enum(["development", "production", "test"]).optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
	console.error("❌ Invalid environment variables:", parsed.error.issues);
	process.exit(1);
}

export const config = {
	port: parsed.data.PORT || 3001,
	database: {
		url: parsed.data.DATABASE_URL,
	},
	jwt: {
		secret: parsed.data.JWT_SECRET,
	},
	node_env: parsed.data.NODE_ENV || "development",
};
