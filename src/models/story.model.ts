import { prisma } from "../lib/prisma";
import { Prisma } from "../generated/prisma/client";
import { AppError } from "../middleware/errorHandler";

export const StoryModel = {
	findAll: async () => {
		return prisma.story.findMany();
	},

	findById: async (id: number) => {
		return await prisma.story.findUnique({
			where: { id },
			include: {
				characters: true,
				threads: {
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
				},
			},
		});
	},

	findByUserId: async (userId: number) => {
		return prisma.story.findMany({ where: { userId } });
	},

	update: async (id: number, data: Prisma.StoryUpdateInput) => {
		const story = await prisma.story.findUnique({ where: { id } });
		if (!story) throw new AppError("Story not found", 404);
		return prisma.story.update({ where: { id }, data });
	},

	delete: async (id: number) => {
		const story = await prisma.story.findUnique({ where: { id } });
		if (!story) throw new AppError("Story not found", 404);
		return prisma.story.delete({ where: { id } });
	},

	create: async (data: Prisma.StoryCreateInput) => {
		return prisma.story.create({ data });
	},

	checkOwnership: async (id: number, userId: number) => {
		const story = await StoryModel.findById(id);
		if (!story) throw new AppError("No story found", 404);
		if (story.userId !== userId) throw new AppError("Not authorized", 403);
		return story;
	},
};
