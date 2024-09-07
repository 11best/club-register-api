import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "elysia";
import { getTeacher } from "../user/handler";

const prisma = new PrismaClient();

export async function verifyId(id: number) {
  const isRegistered = await prisma.loginUser.findUnique({
    where: { id: id },
  });
  const isIdMatched = await getTeacher(id);
  return { isRegistered: !!isRegistered && isIdMatched };
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
