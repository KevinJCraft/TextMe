import { Prisma } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/errorHandler";

export const ThreadModel = {
	findAll: async (storyId: number) => {
		return await prisma.thread.findMany({
			where: { storyId },
			include: {
				characters: {
					include: {
						character: true,
					},
				},
			},
		});
	},

	findById: async (id: number) => {
		return await prisma.thread.findUnique({
			where: { id },
			include: {
				characters: {
					include: {
						character: true,
					},
				},
				messages: {
					orderBy: { sentAt: "asc" },
					include: {
						character: true,
					},
				},
			},
		});
	},

	create: async (data: Prisma.ThreadCreateInput) => {
		return await prisma.thread.create({ data });
	},

	update: async (id: number, data: Prisma.ThreadUpdateInput) => {
		return await prisma.thread.update({ where: { id }, data });
	},

	delete: async (id: number) => {
		return await prisma.thread.delete({ where: { id } });
	},

	addCharacter: async (threadId: number, characterId: number) => {
		return await prisma.threadCharacter.create({
			data: { threadId, characterId },
		});
	},

	removeCharacter: async (threadId: number, characterId: number) => {
		return await prisma.threadCharacter.delete({
			where: { threadId_characterId: { threadId, characterId } },
		});
	},
};
