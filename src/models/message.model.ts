import { Prisma } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";

export const MessageModel = {
	findAll: async (threadId: number) => {
		return await prisma.message.findMany({
			where: { threadId },
			orderBy: { sentAt: "asc" },
			include: {
				character: true,
			},
		});
	},

	findById: async (id: number) => {
		return await prisma.message.findUnique({
			where: { id },
			include: {
				character: true,
			},
		});
	},

	create: async (data: Prisma.MessageCreateInput) => {
		return await prisma.message.create({
			data,
			include: {
				character: true,
			},
		});
	},

	update: async (id: number, data: Prisma.MessageUpdateInput) => {
		return await prisma.message.update({
			where: { id },
			data,
			include: {
				character: true,
			},
		});
	},

	delete: async (id: number) => {
		return await prisma.message.delete({ where: { id } });
	},
};
