import { Request, Response } from "express";

export class TodosCrontroler {
  //* DI = dependenci inyections
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json([
      { id: 1, text: "Buy Milk", createdAt: new Date() },
      { id: 2, text: "Buy bread", createdAt: null },
      { id: 3, text: "Buy water", createdAt: new Date() },
    ]);
  };
}
