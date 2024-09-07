import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "elysia";
import { getTeacher } from "../user/handler";

interface LoginUserRequest {
  id: number;
  password: string;
}

const prisma = new PrismaClient();

export async function getLoginUser() {
  try {
    return await prisma.loginUser.findMany();
  } catch (e: unknown) {
    console.error(`Error getting login user: ${e}`);
  }
}

async function createLoginUser(req: LoginUserRequest) {
  try {
    return await prisma.loginUser.create({
      data: {
        id: req.id,
        password: req.password,
      },
    });
  } catch (e: unknown) {
    console.error(`Error creating login user: ${e}`);
  }
}

export async function verifyId(id: number) {
  const isRegistered = await prisma.loginUser.findUnique({
    where: { id: id },
  });
  const isIdMatched = await getTeacher(id);
  return { isRegistered: !!isRegistered && isIdMatched };
}

export async function registerLoginUser(req: LoginUserRequest) {
  const { isRegistered } = await verifyId(req.id);
  if (!isRegistered) {
    const encryptedPassword = await Bun.password.hash(req.password, {
      algorithm: "bcrypt",
      cost: 4,
    });
    await createLoginUser({ id: req.id, password: encryptedPassword });
    return { message: "register successful!" };
  } else {
    return { message: "already register!" };
  }
}
