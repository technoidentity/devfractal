1. What is functional programming(in one sentence)?

2. What is a referentially transparent expression?

3. Is the following function a pure function? Why or why not?

   ```typescript
   function factorial(n: number): number {
     let fact = 1;
     for (let i = 1; i <= n; i++) {
       fact *= i;
     }
     console.log(fact);
     return fact;
   }
   ```

4. What are some of the advantages of data over traditional OO programming in a garbage collected language?

5. What is structural typing? Give an example.

6. Can you guess the name of the following functions and their function by their signature?

   ```typescript
   function foo<T, U(x: readonly T[], f: (x: T) => U): U[]
   function bar<T>(x: readonly T[], f: (x: T) => boolean): boolean
   function baz<T, U>(x: readonly T[], f: (x: U, y: T) => U): U
   function qux<T, U>(x: readonly T[], f: (x: T) => readonly U[]): U[]
   function fizz<T extends object, K extends keyof T>(x: T, k: K): T[K]
   ```

7. Specify type signatures for the following functions:

   ```javascript
   function pick(obj, [k1, k2, k2])
   function deepFlatten(arr)
   function chain(iter1, iter2, iter3) // variadic
   function merge(first, second) // two arguments only
   // returns all rows from primaryTable with foreignTable rows joined in
   function join(primaryTable, foreignTable, primaryKey, foreignKey)
   function slice(arr)(start, stop)
   ```

8. Explain the purpose of 'imperative shell and functional core'.

9. Explain the reasons for using `readonly` for arrays and objects.

10. What is the purpose of writing invariants?

11. Write a `zod` schema for the following type:

    ```typescript
    type Person = {
      name: string;
      age: number;
      address: {
        street: string;
        city: string;
        state: string;
        zip: string;
      };
      phoneNumbers: string[];
    };
    ```

12. Write the following one line javascript functions. Don't use typescript

    ```javascript
    const merge = (obj1, obj2) => _;
    const insert = (arr, index, value) => _;
    const set = (obj, key, value) => _;
    const sum = arr => _;
    const shalloClone = arr => _;
    ```

13. Write a function to rename properties of an object in javascript. The function should take an object and an object with old and new property names as arguments. The function should return a new object with the renamed properties. DO NOT use typescript

    ```javascript
    const rename = (obj, { oldName: 'newName' }) => //...
    // example
    rename({ a: 1, b: 2 }, { a: 'x', b: 'y' }) // { x: 1, y: 2 }
    ```
