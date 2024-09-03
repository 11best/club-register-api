import { Elysia, t } from "elysia";
import {
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
} from "./teacher";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/teachers", () => getTeachers())
  .get("/teacher/:id", ({ params: { id } }) => getTeacher(id), {
    params: t.Object({ id: t.String() }),
  })
  .post("/teacher", ({ body }) => createTeacher(body), {
    body: t.Object({
      id: t.String(),
      firstname: t.String(),
      lastname: t.String(),
    }),
  })
  .put("/teacher", ({ body }) => updateTeacher(body), {
    body: t.Object({
      id: t.String(),
      firstname: t.String(),
      lastname: t.String(),
    }),
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
