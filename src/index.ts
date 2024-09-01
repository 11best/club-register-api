import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";

const app = new Elysia();
const prisma = new PrismaClient();

async function getTeachers() {
  try {
    return await prisma.teachers.findMany();
  } catch (e: unknown) {
    console.error(`Error getting posts: ${e}`);
  }
}

app.get("/", () => "Hello Elysia");
app.get("/teachers", () => getTeachers());

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
