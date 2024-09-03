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

export async function createTeacher(req: any) {
  try {
    return await prisma.teachers.create({
      data: {
        id: req.id,
        firstname: req.firstname,
        lastname: req.lastname,
      },
    });
  } catch (e: unknown) {
    console.error(`Error creating teacher: ${e}`);
  }
}

export async function updateTeacher(req: any) {
  try {
    return await prisma.teachers.update({
      where: {
        id: req.id,
      },
      data: {
        firstname: req.firstname,
        lastname: req.lastname,
      },
    });
  } catch (e: unknown) {
    console.error(`Error updating teacher: ${e}`);
  }
}

export async function deleteTeacher(id: string) {
  try {
    return await prisma.teachers.delete({
      where: { id: id },
    });
  } catch (e: unknown) {
    console.error(`Error deleting teacher id: ${id} error: ${e}`);
  }
}
