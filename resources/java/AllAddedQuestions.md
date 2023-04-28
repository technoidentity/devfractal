1. If function foo mutates local variables, is foo functional?

   > answer: yes

2. Which of the following are true.

   a. Every object must implement equals

   b. Every object must implement hashCode

   c. Every object must implement toString

   d. Every object must implement clone

   e. Including equals, hashCode, toString in Object was a Java language design
   mistake.

   f. Though every object need not override these methods, it was a good idea to
   include them in Object.

   > answer: e

3. Which of the following is true.

   a. In general, interfaces allow better reuse than class based inheritance.

   b. In general, interface allow better polymorphism than inheritance.

   c. Interfaces are a better mechanism for creating types.

   d. It's recommended that all classes must implement an interface, with all
   it's methods defined in methods.

   e. non final methods are preferable to final methods.

   > answer: a, b, c

4. In modern Java, marker interfaces are not useful. True or false?

   > answer: true. Use annotations instead.

5. It's better to depend on finally( and using) instead of finalize. True or
   false?

   > answer: true

6. Which of the following is true.

   a. Java has pass by reference.

   b. In Java, everything is an object.

   c. Inheritance is reuse.

   d. Java only supports object oriented programming.

   e. Java is more type safe than Scala, C++, C#.

   f. Java has more polymorphism mechanisms than most languages including C++.

   g. Java has pointers.

   > answer: g

7. For the statement Point[] arr = new Point[5];, how many objects are created?

   a. 6, one array object and five Point objects

   b. 1

   c. 5

   d. 0

   > answer: b

8. For the statement Point [] arr;, how many objects are created?

   a. 6, one array object and five Point objects

   b. 1

   c. 5

   d. 0

   > answer: d

9. Exception handling is error handling. True or false?

   answer: true

10. Pick true statements.

    a. Array types are polymorphic i.e. if B inherits from A, then B[] is A.

    b. This causes a lot of trouble for Java programmers.

    > answer: both true.

11. Which of the following are some of the advantages of exceptions over
    returning an error value.

    a. Separates error handling code from program logic(business logic)

    b. is more type safe.

    c. Handling errors becomes necessary.

    d. All of the above.

    > answer: d

12. What are the advantages of return an object representing an error like
    Result/Either/Try/Option instead of exceptions.

    a. Is more type safe.

    b. Is more composable.

    c. Is more functional.

    d. All of the above

    > answer: d

13. Which of the following is preferable in functional Java.

    a. throw unchecked exception

    b. throw checked exception

    c. return error code

    d. return an object representing both value and an error like Option or
    Result.

    > answer: 3

14. Let's assume you are writing a function find to find a value within a
    collection. If the collection doesn't contain the value, you should

    a. return null

    b. throw an exception

    c. Return Option

    d. Return a default value like 0

    > answer: c

15. Which of the following statements are true, if method foo calls method bar
    throwing checked exceptions A and B

    a. Almost never catch unchecked exceptions

    b. Always catch checked exceptions. For example, foo must catch both A and B

    c. Only catch those checked exceptions you can handle, rest add it to throws
    clause. If foo can only handle A, then catch A and add B to throws clause.

    d. Always catch all exceptions and transform them if needed. e. If possible,
    avoid checked exceptions.

    > answer: a, c, e (it's fine to not include e)
