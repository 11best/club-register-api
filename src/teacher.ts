import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getTeachers() {
  try {
    return await prisma.teachers.findMany();
  } catch (e: unknown) {
    console.error(`Error getting teachers: ${e}`);
  }
}

export async function getTeacher(id: string) {
  try {
    return await prisma.teachers.findUnique({
      where: { id: id },
    });
  } catch (e: unknown) {
    console.error(`Error getting teacher id: ${id} error: ${e}`);
  }
}
