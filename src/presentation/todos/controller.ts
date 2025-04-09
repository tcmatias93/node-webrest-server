import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodosController {
  //* DI
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todo = await prisma.todo.findMany();

    return res.json(todo);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    const todoById = await prisma.todo.findFirst({
      where: {
        id: id,
      },
    });

    todoById
      ? res.json(todoById)
      : res.status(404).json({ error: `TODO with id ${id} not found` });
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ error: error });

    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error) return res.status(404).json({ error: error });

    const todoById = await prisma.todo.findFirst({
      where: {
        id: id,
      },
    });

    if (!todoById)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    const todo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: updateTodoDto!.values,
    });

    res.json(todo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const todo = await prisma.todo.findFirst({
      where: {
        id: id,
      },
    });

    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    const todoDeleById = await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    todoDeleById
      ? res.json(todoDeleById)
      : res.status(404).json({ error: `Todo with id ${id} not found` });
  };
}
