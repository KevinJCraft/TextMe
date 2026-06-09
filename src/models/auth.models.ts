import { Prisma } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";

export const AuthModel = {
	findByEmail: async (email: string) => {
		return await prisma.user.findUnique({ where: { email } });
	},

	createUser: async (data: { name: string; email: string; password: string }) => {
		return await prisma.user.create({ data });
	},
};
