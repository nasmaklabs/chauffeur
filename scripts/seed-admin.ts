import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding admin user...');

    const email = 'admin@aacomfort.com';
    const password = 'admin123';
    const name = 'Admin User';

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
        where: { email },
    });

    if (existingAdmin) {
        console.log('✅ Admin user already exists');
        console.log(`Email: ${email}`);
        return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            role: 'admin',
        },
    });

    console.log('✅ Admin user created successfully!');
    console.log('');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', password);
    console.log('');
    console.log('⚠️  Please change the password after first login!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding admin user:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

