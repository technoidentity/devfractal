import { faker } from "@faker-js/faker";

let nextTaskId = 0;

export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

let tasks: Task[] = [];

function initialTasks() {
  const tasks = [];
  for (let i = 0; i < 10; i++) {
    tasks.push({
      id: nextTaskId++,
      title: faker.lorem.sentence(),
      completed: faker.datatype.boolean(),
    });
  }

  return tasks;
}

export function resetTasks() {
  tasks = initialTasks();
}

export function getTasks() {
  return tasks;
}

export function getTask(id: number) {
  return tasks.find(task => task.id === id);
}

export function createTask(title: string) {
  const task = {
    id: nextTaskId++,
    title,
    completed: false,
  };

  tasks.push(task);

  return task;
}

export function updateTask(id: number, title: string, completed: boolean) {
  const task = getTask(id);

  if (task) {
    if (title !== undefined) {
      task.title = title;
    }
    if (completed !== undefined) {
      task.completed = completed;
    }
  }

  return task;
}

export function deleteTask(id: number) {
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex !== -1) {
    const task = tasks[taskIndex];
    tasks.splice(taskIndex, 1);
    return task;
  }

  return undefined;
}

resetTasks();
