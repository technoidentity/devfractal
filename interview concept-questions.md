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
