import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding admin user...");

  const email = process.env.ADMIN_EMAIL || "info.aaccltd@gmail.com";
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "Admin User";

  if (!password) {
    throw new Error("Set ADMIN_PASSWORD to create the admin user");
  }

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.log("✅ Admin user already exists");
    console.log(`Email: ${email}`);
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create admin user
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: "admin",
    },
  });

  console.log("✅ Admin user created successfully!");
  console.log("");
  console.log("📧 Email:", email);
  console.log("");
  console.log("⚠️  Please change the password after first login!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding admin user:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
