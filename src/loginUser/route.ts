import { Elysia, t } from "elysia";
import {
  getLoginUsers,
  loginUser,
  registerLoginUser,
  verifyId,
} from "./handler";

export const user = new Elysia()
  .get("/login-user", () => getLoginUsers())
  .post("/verify-id", ({ body: { id } }) => verifyId(id), {
    body: t.Object({
      id: t.Number(),
    }),
  })
  .guard(
    {
      body: t.Object({
        id: t.Number(),
        password: t.String(),
      }),
    },
    (app) =>
      app
        .post("/register", async ({ body }) => registerLoginUser(body))
        .post("/login", async ({ body }) => loginUser(body))
  );
