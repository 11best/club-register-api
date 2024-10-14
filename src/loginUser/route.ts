import { Elysia, t } from "elysia";
import {
  getLoginUsers,
  loginUser,
  registerLoginUser,
  verifyId,
} from "./handler";
import jwt from "@elysiajs/jwt";

export const user = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    })
  )
  .get("/login-user", async ({ jwt, set, cookie: { auth } }) => {
    const profile = await jwt.verify(auth.value);
    if (!profile) {
      set.status = 401;
      return "Unauthorized";
    }

    return getLoginUsers();
  })
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
        .post("/login", async ({ jwt, cookie: { auth }, body }) => {
          const { isLoggedin } = await loginUser(body);
          if (isLoggedin) {
            auth.set({
              value: await jwt.sign({ id: body.id }),
              httpOnly: true,
              maxAge: 7 * 86400,
            });
            return `Logged in!`;
          }
        })
  );
