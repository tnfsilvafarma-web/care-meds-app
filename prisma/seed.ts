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
    try {
        const hashedPassword = await bcrypt.hash("admin123", 10);

        const location = await prisma.location.upsert({
            where: { id: "loc_001" },
            update: {},
            create: {
                id: "loc_001",
                name: "Clínica Central",
                address: "Av. da Saúde, 123",
            }
        });

        const user = await prisma.user.upsert({
            where: { username: "admin" },
            update: { locationId: location.id },
            create: {
                id: "cls_admin_001",
                name: "Administrador Central",
                username: "admin",
                password: hashedPassword,
                role: "ADMIN",
                locationId: location.id
            },
        });
        console.log("Seed successful: Admin user created/updated with Location");
    } catch (error) {
        console.error("Error seeding data:", error);
    }
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
