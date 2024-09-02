import { Elysia, t } from "elysia";
import { getTeachers, getTeacher } from "./teacher";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/teachers", () => getTeachers())
  .get("/teacher/:id", ({ params: { id } }) => getTeacher(id), {
    params: t.Object({ id: t.String() }),
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
