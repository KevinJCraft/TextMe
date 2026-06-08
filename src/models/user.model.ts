import { prisma } from "../lib/prisma";
import { Prisma } from "../generated/prisma/client";
import { AppError } from "../middleware/errorHandler";

export const UserModel = {
	findAll: async () => {
		return prisma.user.findMany();
	},

	findById: async (id: number) => {
		return prisma.user.findUnique({ where: { id } });
	},

	create: async (data: Prisma.UserCreateInput) => {
		return prisma.user.create({ data });
	},

	update: async (id: number, data: Prisma.UserUpdateInput) => {
		const user = await prisma.user.findUnique({ where: { id } });
		if (!user) throw new AppError("User not found", 404);
		return prisma.user.update({ where: { id }, data });
	},

	delete: async (id: number) => {
		const user = await prisma.user.findUnique({ where: { id } });
		if (!user) throw new AppError("User not found", 404);
		return prisma.user.delete({ where: { id } });
	},
};
