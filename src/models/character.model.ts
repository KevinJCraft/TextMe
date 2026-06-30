import { Prisma } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";

export const CharacterModel = {
	findAll: async (storyId: number) => {
		return await prisma.character.findMany({ where: { storyId } });
	},

	findById: async (id: number) => {
		return await prisma.character.findUnique({ where: { id } });
	},

	create: async (data: Prisma.CharacterCreateInput) => {
		return await prisma.character.create({ data });
	},

	update: async (id: number, data: Prisma.CharacterUpdateInput) => {
		return await prisma.character.update({ where: { id }, data });
	},

	delete: async (id: number) => {
		return await prisma.character.delete({ where: { id } });
	},
};
