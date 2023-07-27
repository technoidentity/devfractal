import { RequestHandler, rest } from "msw";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "./fakeTasks";

export const handlers: RequestHandler[] = [
  rest.get("/api/tasks", (_, res, ctx) => {
    const tasks = getTasks();
    return res(ctx.json(tasks));
  }),

  rest.get("/api/tasks/:id", (req, res, ctx) => {
    const { id } = req.params;

    const task = getTask(Number(id));

    return res(ctx.json(task));
  }),

  rest.post("/api/tasks", async (req, res, ctx) => {
    const { title } = await req.json();

    const task = createTask(title);

    return res(ctx.json({ task }));
  }),

  rest.put("/api/tasks/:id", async (req, res, ctx) => {
    const { id } = req.params;
    const { title, completed } = await req.json();

    const task = updateTask(Number(id), title, completed);

    return res(ctx.json(task));
  }),

  rest.patch("/api/tasks/:id", async (req, res, ctx) => {
    const { id } = req.params;
    const { title, completed } = await req.json();

    const task = updateTask(Number(id), title, completed);

    return res(ctx.json(task));
  }),

  rest.delete("/api/tasks/:id", (req, res, ctx) => {
    const { id } = req.params;
    const task = deleteTask(Number(id));
    return res(ctx.json(task));
  }),
];
