import { Prisma } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";

export const UserModel = {
	update: async (id: number, data: Prisma.UserUpdateInput) => {
		return await prisma.user.update({ where: { id }, data });
	},

	delete: async (id: number) => {
		return await prisma.user.delete({ where: { id } });
	},
};
