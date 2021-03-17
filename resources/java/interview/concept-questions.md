1. How many tables do we need to implement a many to many relationship in a relational database?

Answer: 3

2. Does Java have pass by reference?

Answer: no

3. is it safe to convert Integer to an int?

Answer: No. Integer reference might contain 'null'.

4. What is the advantage of option over using null?

Answer: type safety. No NullPointerExceptions.

5. If A inherits from B, can we assign a B reference to A reference variable?

Answer: yes

6. If A inherits from B, in Java can we assign B[] to A[]? Is Java correct in doing so?

Answer: Yes for the first, No for the second.

7. What are the advantages of exception handling?

8. Checked exceptions vs unchecked exceptions

9. For the statement `Point[] arr = new Point[5];`, how many objects are created?

Answer: 1

10. For the statement `Point [] arr;`, how many objects are created?

Answer: 0

11. Java streams are lazy or eager?

Answer: lazy. They are computer as needed.

12. Can Java streams be traversed multiple times?

Answer: No. Only once.

13. What is a pure function? How is it related to immutability?

14. If we use ArrayList<T> with three types like Integer, String, Point, how many classes are actually instantiated and exist at runtime?

Answer: only one.

15. Is there any performance difference between final and non final method?

Answer: yes. Generally final methods lead to better performance.

16. What is the time complexity of LinkedList::get(int index) method?

Answer: O(n).

17. Can we search faster if we know ArrayList or array is sorted? Which algorithm? Time complexity?

Answer: yes, binary search, O(log n)

18. Is it safe in Java to iterate over a collection in a thread(reading) while another thread modifies(add/remove) that collection?

Answer: No. ConcurrentModification might be thrown. Might lead to race conditions.

19. Is it fine to override equals without overriding hashCode?

Answer: No. Item 11 in Effective Java.

20. Should we avoid finalizers? If yes, is there any alternative for cleaning up/releasing resources?

Answer: Item 9 in Effective Java.

21. Which are preferable in general, interfaces or abstract classes? Why?

Answer: interface. Item 20 in Effective Java.

22. Is it okay to have side effects in functions passed to stream methods like map?

Answer: No. They should be pure as much as possible. Item 45 in Effective Java.

23. What are defensive copies? Do we need them if objects are immutable?

Answer: No need for defensive copies if immutable. Item 50 in Effective Java.

24. Is an object is mutable, is it safe to use it in multiple threads? What will you use to share mutable objects safely?

Answer: Mostly no. Locks/monitors etc. Item 78 in Effective Java.

25. Should we use wait and notify in modern Java?

Answer: No. Item 81 in Effective JAva

26. Expressions in Java

a) always produce a value
b) almost always produce a value
c) never produce a value
d) depends on the program

Answer: a

27. Java has

a) pass by value only
b) pass by reference only
c) both pass by value and pass by reference
d) pass by value for primitive types and pass by reference for object types

Answer: a

28. If `set1` and `set2` are two `Treeset` objects, which of the following are true

a) set1.addAll(set2) is union of two sets
b) set1.retainAll(set2) is intersection of two sets
c) `addAll` or `retainAll` is not provided on sets
d) values in a Treeset need not support Comparable interface

answer: a,b

29. What are the advantages of returning an object representing an error like Result/Either/Try/Option instead of exceptions?

a. Is more type safe.
b. Is more composable.
c. Is more functional.
d. All of the above

Answer: d

30. A terminal stream operation

a) returns another stream
b) executes the stream pipeline and produces a non stream result
c) displays the stream elements
d) closes the stream

Answer: b

31. java 5 for loop(also sometimes called foreach) can be used with

a) collections
b) arrays and collections
c) arrays and iterables
d) file readers, arrays and collections

Answer: c

32. Which of the following is true

a) A generic class has only one class definition
b) a separate class is generated for each parameterized object
c) a separate class is generated for each primitive but shares the same class for all Objects.
d) All the code is inlined and no class is generated.

Answer: a

33. Does the following code fragment legal(compiles fine if part of a method)?

```
Integer[] ints = new Integer[3];
Object[] objs = ints;
```

Answer: yes

34. Does the following code

```
class Foo {}
class Bar extends Foo {}
class Buzz extends Foo{}
// within some method

Bar[] bars = new Bar[3];
Foo[] foos = bars;

foos[0] = new Buzz();

```

a) compiles fine in Java
b) throws an exception at runtime
c) does not compile
d) compiles and runs fine

Answer: b (of course, this implies a too)

35. Which of the following are some of the advantages of exceptions over returning an error value?

a) Separates error handling code from program logic(business logic)
b) is more type safe.
c) Handling errors becomes necessary.
d) All of the above.

Answer: d

36. A stream in Java can be traversed/iterated

a) only once
b) any number of times

Answer: a

37. After the execution of the statement `Integer[] arr = new Integer[10];`, what is the value of arr[0]?

a) new Integer()
b) null
c) 0
d) none of the above

Answer: b
