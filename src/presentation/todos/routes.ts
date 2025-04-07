import { Router } from "express";
import { TodosCrontroler } from "./controller";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const todoCrontroler = new TodosCrontroler();

    router.get("/", todoCrontroler.getTodos); // es lo mismo que poner router.get("/", (req, res) => todoCrontroler.getTodos(req,res))

    return router;
  }
}
