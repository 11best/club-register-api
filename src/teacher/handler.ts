import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "elysia";

interface TeacherRequest {
  id?: number;
  firstname: string;
  lastname: string;
}

const prisma = new PrismaClient();

export async function getTeachers() {
  try {
    return await prisma.user.findMany({ where: { role: "TEACHER" } });
  } catch (e: unknown) {
    console.error(`Error getting teachers: ${e}`);
  }
}

export async function getTeacher(id: number) {
  const teacher = await prisma.user.findUnique({
    where: { id: id, role: "TEACHER" },
  });
  if (!teacher) {
    throw new NotFoundError();
  }
  return teacher;
}

export async function createTeacher(req: TeacherRequest) {
  try {
    return await prisma.user.create({
      data: {
        id: req.id,
        firstname: req.firstname,
        lastname: req.lastname,
        role: "TEACHER",
      },
    });
  } catch (e: unknown) {
    console.error(`Error creating teacher: ${e}`);
  }
}

export async function updateTeacher(req: TeacherRequest) {
  try {
    return await prisma.user.update({
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

export async function deleteTeacher(id: number) {
  const deletedTeacher = await prisma.user.delete({
    where: { id: id },
  });
  if (!deletedTeacher) {
    throw new NotFoundError();
  }
  return { message: `teacher id: ${id} delete successful!` };
}
