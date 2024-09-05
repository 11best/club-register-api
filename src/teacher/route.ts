import { Elysia, t } from "elysia";
import {
  createTeacher,
  deleteTeacher,
  getTeacher,
  getTeachers,
  updateTeacher,
} from "./handler";

export const teacher = new Elysia({ prefix: "/teacher" })
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
