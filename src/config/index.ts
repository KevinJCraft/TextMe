import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
	PORT: z.string().optional(),
	DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
	JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
	NODE_ENV: z.enum(["development", "production", "test"]).optional(),
	AWS_ACCESS_KEY_ID: z.string().min(1, "AWS_ACCESS_KEY_ID is required"),
	AWS_SECRET_ACCESS_KEY: z.string().min(1, "AWS_SECRET_ACCESS_KEY is required"),
	AWS_REGION: z.string().min(1, "AWS_REGION is required"),
	AWS_BUCKET_NAME: z.string().min(1, "AWS_BUCKET_NAME is required"),
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
	aws: {
		accessKeyId: parsed.data.AWS_ACCESS_KEY_ID,
		secretAccessKey: parsed.data.AWS_SECRET_ACCESS_KEY,
		region: parsed.data.AWS_REGION,
		bucketName: parsed.data.AWS_BUCKET_NAME,
	},
};
