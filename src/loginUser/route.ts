import { Elysia, t } from "elysia";
import { getLoginUser, registerLoginUser, verifyId } from "./handler";

export const user = new Elysia()
  .get("/login-user", () => getLoginUser())
  .post("/verify-id", ({ body: { id } }) => verifyId(id), {
    body: t.Object({
      id: t.Number(),
    }),
  })
  .post("/register", async ({ body }) => registerLoginUser(body), {
    body: t.Object({
      id: t.Number(),
      password: t.String(),
    }),
  });
