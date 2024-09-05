import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "elysia";
import { getTeacher } from "../teacher/handler";

const prisma = new PrismaClient();

export async function verifyId(id: string) {
  const idMatched = await getTeacher(id);
  if (!idMatched) {
    throw new NotFoundError();
  }
  return { isFound: !!idMatched };
}
