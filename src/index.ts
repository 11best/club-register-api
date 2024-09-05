import { Elysia, NotFoundError, t } from "elysia";
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

async function verifyId(id: string) {
  const idMatched = await getTeacher(id);
  if (!idMatched) {
    throw new NotFoundError();
  }
  return { isFound: !!idMatched };
}

const app = new Elysia()
  .onError(({ code, error, set }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;
      return "Not Found";
    }
  })
  .use(teachers)
  .get("/", () => "Hello Elysia")
  .post("/verify-id", ({ body: { id } }) => verifyId(id), {
    body: t.Object({
      id: t.String(),
    }),
  })
  .post(
    "/register",
    async ({ body }) => {
      let userData: any = body;
      userData.password = await Bun.password.hash(userData.password, {
        algorithm: "bcrypt",
        cost: 4,
      });
      return userData;
    },
    {
      body: t.Object({
        id: t.String(),
        password: t.String(),
      }),
    }
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
