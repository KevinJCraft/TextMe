import { prisma } from "../lib/prisma";

export const UserModel = {
	findAll: async () => {
		return prisma.user.findMany();
	},

	findById: async (id: number) => {
		return prisma.user.findUnique({ where: { id } });
	},

	create: async (data: { name: string; email: string }) => {
		return prisma.user.create({ data });
	},

	update: async (id: number, data: { name?: string; email?: string }) => {
		return prisma.user.update({ where: { id }, data });
	},

	delete: async (id: number) => {
		return prisma.user.delete({ where: { id } });
	},
};
