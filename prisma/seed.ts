// One-time script to hash the admin password and upsert into the database
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: { password: hashedPassword },
    create: {
      name: 'System Admin',
      email: 'admin@example.com',
      password: hashedPassword,
    },
  });

  console.log('Admin user seeded with hashed password.');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
