1. Implement function `pipe`

   ```typescript
   type Fn = (...args: any[]) => any;
   function pipe<T>(src: T, ...fns: Fn[]): any;
   // Example:
   pipe(
     1,
     n => n + 1,
     n => n * 2
   ); // 4
   ```

2. Implement function `partial`

   ```typescript
   function partial(fn: Fn, ...args: any[]): (...rest: any[]) => any;
   // Example:
   const add = (a: number, b: number) => a + b;
   const addOne = partial(add, 1);
   addOne(2); // 3
   ```

3. Implement function `once`

   ```typescript
   function once(fn: Fn): Fn;
   // Example:
   const add = () => {
     console.log("add called");
     1 + 2;
   };
   const addOnce = once(add);
   addOnce(1, 2); // "add called" returns 3
   addOnce(1, 2); // returns 3
   ```

4. Implement `memoize` function. Memoize function is a function that caches the
   result of a function call. If the function is called again with the same
   arguments, the cached result is returned. Use `Map` to cache the results.

   ```typescript
   function memoize(fn: Fn): Fn;
   // Example:
   const add = (a: number, b: number) => a + b;
   const memoizedAdd = memoize(add);
   memoizedAdd(1, 2); // 3
   memoizedAdd(1, 2); // return 3 without calling add
   memoizedAdd(2, 2); // 4 calls add
   memoizedAdd(2, 2); // return 4 without calling add
   ```

5. Implement `reduce` function

   ```typescript
   function reduce(
     arr: readonly any[],
     fn: (acc: any, elem: any) => any,
     init: any
   ): any;
   // Example:
   reduce([1, 2, 3], (acc, elem) => acc + elem, 0); // 6
   reduce([], (acc, elem) => acc + elem, 100); // 100
   ```
