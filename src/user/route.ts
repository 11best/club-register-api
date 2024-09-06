import { Elysia, t } from "elysia";
import { registerUser, verifyId } from "./handler";

export const user = new Elysia()
  .post("/verify-id", ({ body: { id } }) => verifyId(id), {
    body: t.Object({
      id: t.String(),
    }),
  })
  .post("/register", async ({ body }) => registerUser(body), {
    body: t.Object({
      id: t.String(),
      password: t.String(),
    }),
  });
