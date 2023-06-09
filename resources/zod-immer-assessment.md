1. What does `current` function do in immer? Is it okay to use this function in
   production? Explain.

2. What does `original` function do in immer? How is it different from
   `current`? Can this be used in production? Explain.

3. ```typescript
   import { produce } from 'immer'

   const todosArray = [
     { id: 'id1', done: false, body: 'Take out the trash' },
     { id: 'id2', done: false, body: 'Check Email' },
   ]

   // add
   const addedTodosArray = produce(todosArray, draft => {
     draft.push({ id: 'id3', done: false, body: 'Buy bananas' })
   })
   ```

   Explain if the above code perform better than the following code, assuming
   `todosArray` is very large?

   ```typescript
   const addedTodosArray = [
     ...todosArray,
     { id: 'id3', done: false, body: 'Buy bananas' },
   ]
   ```

4. Write a counter using useImmerReducer hook.

5. ```typescript
   const obj = {
     foo: { bar: 100 },
     baz: { qux: 200 },
   }

   const result = produce(obj, draft => {
     draft.baz.qux = 400
   })

   console.log(obj.foo.bar)
   console.log(obj.baz.qux)

   console.log(result.foo.bar)
   console.log(result.baz.qux)

   console.log(obj.foo === result.foo)
   console.log(obj.baz === result.baz)
   ```

   What will be the result of the above code? Explain.

6. What are branded types? Create a branded type for email.

7. When should you use safeParse vs parse (zod spec)?

8. Create a zod type for `Signup` form with `emailid`, `password` and
   `confirmPassword` fields. Make sure you check that `password` and
   `confirmPassword` are equal.

9. Why do we need refine method when it doesn't change typescript type? Explain
   with an example.

10. Create a zod type to represent the following type:

    ```typescript
    type Action =
      | { type: 'INCREMENT' }
      | { type: 'DECREMENT' }
      | { type: 'SET_COUNT'; payload: number }
      | { type: 'RESET' }
    ```
