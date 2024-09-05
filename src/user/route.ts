import { Elysia, t } from "elysia";
import { verifyId } from "./handler";

export const user = new Elysia()
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
  );
