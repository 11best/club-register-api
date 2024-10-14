import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "elysia";
import { getTeacher } from "../user/handler";

interface LoginUserRequest {
  id: number;
  password: string;
}

const prisma = new PrismaClient();

export async function getLoginUsers() {
  try {
    return await prisma.loginUser.findMany();
  } catch (e: unknown) {
    console.error(`Error getting login user: ${e}`);
  }
}

async function getLoginUser(id: number) {
  const user = await prisma.loginUser.findUnique({
    where: { userId: id },
  });
  if (!user) {
    throw new NotFoundError();
  }
  return user;
}

async function createLoginUser(req: LoginUserRequest) {
  try {
    return await prisma.loginUser.create({
      data: {
        userId: req.id,
        password: req.password,
      },
    });
  } catch (e: unknown) {
    console.error(`Error creating login user: ${e}`);
  }
}

export async function verifyId(id: number) {
  const isRegistered = await prisma.loginUser.findUnique({
    where: { userId: id },
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

export async function loginUser(req: LoginUserRequest) {
  const { isRegistered } = await verifyId(req.id);
  if (!isRegistered) {
    return { message: "not yet registered!!!" };
  }
  const userData = await getLoginUser(req.id);
  const isMatched = await Bun.password.verify(req.password, userData.password);
  if (!isMatched) {
    throw new Error("invalid password");
  }
  return { isLoggedin: isMatched };
}
