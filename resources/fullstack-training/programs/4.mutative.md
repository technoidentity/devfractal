# Assignment - Array functions

Implement the following mutative array functions in typescript

1. `push` - adds an element to the end of an array

   ```typescript
   function push<T>(arr: readonly T[], elem: T): T[];
   ```

2. `pop` - removes the last element of an array

   ```typescript
   function pop<T>(arr: readonly T[]): T[];
   ```

3. `unshift` - adds an element to the beginning of an array

   ```typescript
   function unshift<T>(arr: readonly T[], elem: T): T[];
   ```

4. `shift` - removes the first element of an array

   ```typescript
   function shift<T>(arr: readonly T[]): T[];
   ```

5. `insert` - inserts an element at a given index

   ```typescript
   function insert<T>(arr: readonly T[], elem: T, index: number): T[];
   ```

6. `remove` - removes an element at a given index

   ```typescript
   function remove<T>(arr: readonly T[], index: number): T[];
   ```

7. `replace` - replaces an element at a given index

   ```typescript
   function replace<T>(arr: readonly T[], elem: T, index: number): T[];
   ```

8. `copy` - copies an array

   ```typescript
   function copy<T>(arr: readonly T[]): T[];
   ```
