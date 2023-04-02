# Assignment - object functions

Implement the following mutative object functions in typescript

1. `set` - sets a value at a given key

   ```typescript
   function set<T extends object, K extends keyof T>(
     obj: T,
     key: K,
     value: T[K]
   ): T;

   // Example:
   const obj = { a: 1, b: 2 };
   set(obj, "a", 2); // { a: 2, b: 2 }
   ```

2. `pick` - picks the key-value pairs corresponding to the given keys from an
   object

   ```typescript
   function pick<T extends object, K extends keyof T>(
     obj: T,
     keys: readonly K[]
   ): Pick<T, K>;

   // Example:
   const obj = { a: 1, b: 2, c: 3 };
   pick(obj, ["a", "c"]); // { a: 1, c: 3 }
   ```

3. `mergeWith` - merges two objects using a function

   ```typescript
   export function mergeWith<T extends object>(
     fst: T,
     snd: any,
     fn: (x: any, y: any) => any
   ): Record<keyof T, number>;
   ```

4. Implement `deepGet`. Gets the target value in a nested JSON object, based on
   the keys array.

   ```js
   let index = 2;
   const data = {
     foo: {
       foz: [1, 2, 3],
       bar: {
         baz: ["a", "b", "c"],
       },
     },
   };
   deepGet(data, ["foo", "foz", index]); // get 3
   deepGet(data, ["foo", "bar", "baz", 8, "foz"]); // null
   ```
