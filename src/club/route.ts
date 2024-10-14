import { Elysia, t } from "elysia";
import {
  createClub,
  deleteClub,
  getClub,
  getClubs,
  updateClub,
} from "./handler";

export const club = new Elysia({ prefix: "/club" })
  .get("/", () => getClubs())
  .post("/", ({ body: { name } }) => createClub({ name }), {
    body: t.Object({
      name: t.String(),
    }),
  })
  .put("/", ({ body }) => updateClub(body), {
    body: t.Object({
      id: t.Number(),
      name: t.String(),
    }),
  })
  .guard(
    {
      params: t.Object({ id: t.Number() }),
    },
    (app) =>
      app
        .get("/:id", ({ params: { id } }) => getClub(id))
        .delete("/:id", ({ params: { id } }) => deleteClub(id))
  );
