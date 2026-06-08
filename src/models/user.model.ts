import { prisma } from "../lib/prisma";
import { Prisma } from "../generated/prisma/client";

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
		return prisma.user.update({ where: { id }, data });
	},

	delete: async (id: number) => {
		return prisma.user.delete({ where: { id } });
	},
};
