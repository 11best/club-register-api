import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getClubs() {
  try {
    return await prisma.user.findMany();
  } catch (e: unknown) {
    console.error(`Error getting clubs: ${e}`);
  }
}
