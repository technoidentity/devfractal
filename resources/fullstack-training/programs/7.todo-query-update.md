```typescript
type User = Readonly<{
  id: number;
  name: string;
  email: string;
}>;

type Task = Readonly<{
  deadline: Date;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}>;

let users: readonly User[] = getAllUsers();
let todos: readonly Todo[] = getAllTodos(users);
```

1. Learn [fakers](https://fakerjs.dev/guide/). Use this library to implement the above functions `getUsers` and `getTodos` in a way that the data is generated randomly.

2. Write the following function

   ```typescript
   type CompletedTodoListResult = Iterable<{
     username: string;
     todoList: Array<{ title: string; deadline: Date }>;
   }>;

   function getCompletedTodosFor(...userIds: number[]): CompletedTodoListResult;
   ```

Above function is similar to the following pseudo sql query

    ```sql
    SELECT users.name, todos.title
    FROM users
    INNER JOIN todos ON users.id = todos.userId
    WHERE todos.completed = true and users.id in ($x, $y, $z)
    Order by users.name
    ```

In english, get all the todos for the given users, where the todos are completed and order the result by the user name.

3. Write the following function

   ```typescript
   function setCompletedAboveDeadline(userId: number): void;
   ```

Above function is similar to the following pseudo sql query

    ```sql
    UPDATE todos
    SET completed = true
    WHERE userId = $x and deadline < now()
    ```

In english, set all the todos of a specific user to completed where the deadline is in the past.

4. Write a function to return uses with most incomplete todos

   ```typescript
   type MostIncompleteUsersResult = IterableIterator<
     Readonly<{ username: string; count: number }>
   >;
   function getMostIncompleteUsers(n: number): MostIncompleteUsersResult;
   ```

Equivalent SQL query

    ```sql
    SELECT users.name, count(todos.id)
    FROM users
    INNER JOIN todos ON users.id = todos.userId
    WHERE todos.completed = false
    GROUP BY users.id
    ORDER BY count(todos.id) DESC
    LIMIT $n
    ```
