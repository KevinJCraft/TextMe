import { PrismaClient } from "../../src/generated/prisma/client";

export async function seedUsers(prisma: PrismaClient) {
	try {
		const users = await prisma.user.createMany({
			data: [
				{ name: "Kevin", email: "kevin@example.com" },
				{ name: "Eli", email: "Eli@example.com" },
				{ name: "Grayson", email: "Grayson@example.com" },
			],
			skipDuplicates: true,
		});
		console.log(`Seeded ${users.count} users`);
	} catch (err) {
		console.log("ERROR: SeedUsers: ", err);
	}
}
