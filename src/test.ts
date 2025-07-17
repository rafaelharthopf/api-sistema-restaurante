import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const companies = await prisma.company.findMany();
  console.log(companies);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
