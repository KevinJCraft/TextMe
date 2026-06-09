import dotenv from "dotenv";
dotenv.config();

const requireEnv = (key: string): string => {
	const value = process.env[key];
	if (!value) throw new Error(`Missing required environment variable: ${key}`);
	return value;
};

export const config = {
	port: process.env.PORT || 3001,
	database: {
		url: requireEnv("DATABASE_URL"),
	},
	jwt: {
		secret: requireEnv("JWT_SECRET"),
	},
	node_env: process.env.NODE_ENV || "development",
};
