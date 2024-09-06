import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "elysia";
import { getTeacher } from "../teacher/handler";

const prisma = new PrismaClient();

export async function verifyId(id: number) {
  const idMatched = await getTeacher(id);
  if (!idMatched) {
    throw new NotFoundError();
  }
  return { isFound: !!idMatched };
}

export async function registerUser(body: any) {
  let userData: any = body;
  const isIdValid = await verifyId(body.id);
  if (isIdValid) {
    userData.password = await Bun.password.hash(userData.password, {
      algorithm: "bcrypt",
      cost: 4,
    });
    return userData;
  }
}
