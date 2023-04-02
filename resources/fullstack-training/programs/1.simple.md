# Simple functions

1. Write a function to check if a date is valid.

   ```typescript
   isValidDate(year: number, month: number, day: number): boolean
   ```

2. Write a program to check if `n` is a perfect number. Example of a perfect
   number is 28. Sum of all of it's factors excluding itself is 28.

   ```typescript
   isPerfect(n: number): boolean
   ```

3. Write a program to compute pascal triangle.

   ```typescript
   ncr(n: number, r: number): number
   pascalLine(line: number): IterableIterator<number>
   pascalTriangle(lines: number): IterableIterator<IterableIterator<number>>
   ```

4. Write a function to generate fibonacci sequence.

   ```typescript
   fibonacci(n: number): IterableIterator<number>
   ```

5. Write a function `isSorted` to check if the passed in array is sorted.

   ```typescript
   isSortedAscending(arr: ReadonlyArray<number|string>[]): boolean
   ```

6. Write a function to compute sum of all primes between `start` and `stop`.

   ```typescript
   isPrime(n: number): boolean
   primes(start: number, stop: number): IterableIterator<number>
   sumOfPrimes(start: number, stop: number): number
   ```

7. Write a program to compute `x` to the power of `y`. Assume `y` to be an int.

   ```typescript
   power(x: number, y: number): number
   ```
