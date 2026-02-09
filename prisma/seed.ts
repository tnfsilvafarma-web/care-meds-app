import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Standard Prisma override for datasources
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL || "file:./dev.db",
        },
    },
});

async function main() {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await prisma.user.upsert({
        where: { username: "admin" },
        update: {},
        create: {
            username: "admin",
            name: "System Admin",
            password: hashedPassword,
            role: "ADMIN",
        },
    });

    console.log("Admin user created successfully.");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
