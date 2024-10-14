import { Elysia, t } from "elysia";
import { getClubs } from "./handler";

export const club = new Elysia({ prefix: "/club" }).get("/", () => getClubs());
