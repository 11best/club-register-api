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
  .post("", ({ body }) => createTeacher(body), {
    body: t.Object({
      id: t.Optional(t.Number()),
      firstname: t.String(),
      lastname: t.String(),
    }),
  })
  .put("", ({ body }) => updateTeacher(body), {
    body: t.Object({
      id: t.Number(),
      firstname: t.String(),
      lastname: t.String(),
    }),
  })
  .guard(
    {
      params: t.Object({ id: t.Number() }),
    },
    (app) =>
      app
        .get("/:id", ({ params: { id } }) => getTeacher(id))
        .delete("/:id", ({ params: { id } }) => deleteTeacher(id))
  );
