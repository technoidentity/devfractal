1. **Which of the following are true**

    a. Every object must implement `equals`

    b. Every object must implement `hashCode`

    c. Every object must implement `toString`

    d. Every object must implement `clone`

    e. Including `equals`, `hashCode`, `toString` in `Object` was a Java language design mistake.

    f. Though every object need not override these methods, it was a good idea to include them in `Object`.

    > answer: e

2. **Which of the following is true**

    a. In general, interfaces allow better reuse than class based inheritance.

    b. In general, interface allow better polymorphism than inheritance.

    c. Interfaces are a better mechanism for creating types.

    d. It's recommended that all classes must implement an interface, with all it's methods defined in methods.

    e. non final methods are preferable to final methods.

    > answer: a, b, c

3. **In modern Java, marker interfaces are not useful. True or false?**

    > answer: true. Use annotations instead.

4.  **Java Programming Language allows multiple inheritance of**

    (A) classes

    (B) interfaces

    (C) both

    (D) none

    > _answer:B_

5.  **An interface can declare:**

    (A) public static final constants

    (B) public abstract methods

    (C) nested classes and interfaces

    (D) all of the above

    > _answer:D_

6.  **The interface constants are implicitly**

    (A) public, static and must be initialized

    (B) protected and static

    (C) public, static, final and must be initialized

    (D) static and final

    > _answer:C_

7. **Consider**
    public interface X extends Y,Z {
    ...
    }
    **Now interface X defines a contract that includes**

    (A) all the methods and constants defined in interface Y,Z and
    any new methods and constants defined in interface X

    (B) all the common methods and constants defined in x,Y,Z

    > _answer:A_

8. **Consider two interfaces:**

        public interface X {
          int val=1;
        }
        public interface Y extends X {
          int val=2;
        }

    **Inside the interface Y, val refers to**

    (A) val of X

    (B) val of Y

    > _answer:B_

9. **If an interface inherits two or more constants with the same name:**

        public interface X {
          int val=1;
        }
        public interface Y {
          int val=2;
        }
        public interface Z extends X,Y {
        }

    **What happens if we reference Z.val**

    (A) it refers to X.val

    (B) it refers to Y.val

    (C) compile error because of ambiguity

    (D) it refers to X.val + Y.val

    > _answer:C_

10. **If a class implements different interfaces containing a method with the same signature, then there can only be one implementation of that method**

    (A) True

    (B) False

    > _answer:A_

11. **If a class implements multiple interfaces and if the inherited methods have the same signature but different return types, then**

    (A) one of the return types must be a subtype of all the others, otherwise a compile-time
    error occurs

    (B) class must implement methods with all different return types

    (C) class need not implement any method

    (D) class cannot implement multiple interfaces

    > _answer:A_

12. **If a class implements multiple interfaces and if the inherited methods have the same name but different types of parameters, then**

    (A) compile-time error occurs

    (B) class must implement methods with all the different parameter signatures

    (C) class need not implement any method

    (D) class must implement at least one method

    > _answer:B_

13. **consider the code:**

        class X implements A
        {
            ...
        }

        class Z extends Y implements A
        {
            private X obj = new X();
            ...
        }

    **Which of the following is true:**

    (A) class Z can implement all the interface methods from scratch

    (B) class Z can re-use the methods of class X, by creating an object of class X and forwarding
    all the methods of the interface to that object, returning any values

    (C) class Z can skip implementing the interface methods

    (D) class Z can directly extends X and Y classes

    > _answer:A,B_

14. **Which of the following are marker interfaces**

    (A) Serializable

    (B) Externalizable

    (C) Cloneable

    (D) Comparable

    > _answer:A,B,C_

15. **Which of the following is true?**

    a. Java has pass by reference.
    b. In Java, everything is an object.
    c. Inheritance is reuse.
    d. Java only supports object oriented programming.
    e. Java is more type safe than Scala, C++, C#.
    f. Java has more polymorphism mechanisms than most languages including C++.
    g. Java has pointers.

    > answer: g

16. **For the statement `Point[] arr = new Point[5];`, how many objects are created?**

    a. 6, one array object and five `Point` objects
    b. 1
    c. 5
    d. 0

    > answer: b

17. **For the statement `Point [] arr;`, how many objects are created?**

    a. 6, one array object and five Point objects
    b. 1
    c. 5
    d. 0

    >answer: d

