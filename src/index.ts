import { Elysia } from "elysia";
import { teacher } from "./user/route";
import { user } from "./loginUser/route";
import { club } from "./club/route";

const app = new Elysia()
  .onError(({ code, error, set }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;
      return "Not Found";
    }
  })
  .use(user)
  .use(teacher)
  .use(club)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
