import { seedUsers } from "./seeders/InitialUsers";
import { prisma } from "../src/lib/prisma";

async function main() {
	await seedUsers(prisma);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
