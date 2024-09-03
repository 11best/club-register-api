import { Elysia, t } from "elysia";
import {
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "./teacher";

const teachers = new Elysia({ prefix: "/teacher" })
  .get("/", () => getTeachers())
  .guard(
    {
      body: t.Object({
        id: t.String(),
        firstname: t.String(),
        lastname: t.String(),
      }),
    },
    (app) =>
      app
        .post("", ({ body }) => createTeacher(body))
        .put("", ({ body }) => updateTeacher(body))
  )
  .guard(
    {
      params: t.Object({ id: t.String() }),
    },
    (app) =>
      app
        .get("/:id", ({ params: { id } }) => getTeacher(id))
        .delete("/:id", ({ params: { id } }) => deleteTeacher(id))
  );

const app = new Elysia()
  .use(teachers)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
