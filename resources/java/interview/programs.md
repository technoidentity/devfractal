# Interview programs

## Always start with one very simple program from the following. No use of library functions.

1. Write a method/function to find the largest element in an array.
2. Write a function `indexOf` to return the index of an element from an array.
3. Write a function to compute the sum of all the elements in an array.
4. Write a function to `power` to compute `x` to the power of `y`. Both `x` and
   `y` are integers.
5. Write a function `isPrime` to check if the passed number is prime.
6. Write a function `squareOdds` with the method signature of
   `ArrayList<Integer> squareOdds(int[] arr)` which returns an array with
   elements from `arr` but all odd values squared.

```
  assert(squareOdds([11, 3, 4, 5, 6]) == [121, 9, 4, 25, 6])
```

## Follow it up with one or two more difficult functions.

1. Write a function to reverse all the elements in an array.
2. Write a function to generate fibonacci sequence.
3. Write a function to reverse all the elements in an array.
4. Write a function `partition` with the method signature of
   `int[][] partition(int arr[], int value)`, which returns two arrays, first
   containing all values in `arr` smaller than the `value` and second array
   which contain all values in `arr` larger than the `value`. Make sure you
   exclude `value` from both arrays.

```
Eg:
  assert(partition([1, 4, 2, 5, 3, 7], 3)[0] == [1, 2])
  assert(partition([1, 4, 2, 5, 3, 7], 3)[1] == [4, 5, 7])

```

5. Write a function `mergeSorted` with the method signature of
   `int[] merge(int[] sorted, int[] sorted2)` which merges two sorted arrays
   `sorted` and `sorted2` and returns the sorted array but in descending order.
   Time complexity of `O(n)` and space complexity of `O(n)`.

```
Eg:
  assert(mergeSorted([1, 3, 5], [2, 4]) == [5, 4, 3, 2, 1])
```

6. Write a function `pairs` with the signature of `int[][] pairs(int[] arr)`,
   which returns an array of two element array containing adjacent values.

```
Eg:
  assert(pairs([1, 2, 3, 4, 5]) == [[1, 2], [2, 3], [3, 4], [4, 5]])
```

7. Write a function `isSorted` with the method signature of
   `bool isSorted(int arr[])` to check if the passed in array is sorted.

```
  assert(isSorted([]) == true)
  assert(isSorted([1, 3, 2]) == false)
  assert(isSorted([1, 2, 3, 5]) == true)
```

8. Write a function `combine` with the method signature of
   `ArrayList<Integer> combine(Collection<Integer> first, Collection<Integer> second)`
   which returns an ArrayList with all the values from both `first` and
   `second`.

9. Write a function using lambda expressions and streams in Java or LINQ in C#
   to compute sum of all primes less than n. Method signature should be
   `int sumOfPrimes(int[] arr)`.
