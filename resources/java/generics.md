1.  **A generic type declaration can contain**

    a. only one type parameter

    b. multiple type parameters, separated by commas

    c. multiple type parameters, separated by colons

    d. no parameters

    > answer:b

2.  **Which of the following is true:**

    a. a generic class has only one class definition

    b. a separate class is generated for each parameterized object

    > answer:a

3.  **Which of the following is true?**

    a. A generic class with a type parameter T can define static fields of type
    T and use T anywhere within a static method. b. A type parameter cannot be
    used when creating objects and arrays.

    > answer: b

4.  **A type bound can express multiple dependencies by declaring that the type
    parameter extends multiple interfaces as**

         a. interface A<T extends B ? C ? D> {}

         b. interface A<T implements B , C , D> {}

         c. interface A<T extends B , C , D> {}

         d. interface A<T extends B>,<T extends C><T extends D> {}

    > answer:c

5.  **Which of the following declares a `List` type that matches the type
    _"Number or any of its subtypes"_:**

    a. List< Number >

    b. List< Integer >

    c. List<? extends Number>

    d. all of the above

    > answer:c

6.  **Which of the following declares a `List` type that matches the type
    _"Integer or any of its super types"_:**

    a. List< Number >

    b. List< Integer >

    c. List<? extends Integer>

    d. List<? super Integer>

    > answer:d

7.  **The type `List<? extends Number & Serializable>`**

    a. defines a `List` of type `Number` or any of its subtypes

    b. defines a `List` of type `Serializable` or any of its subtypes

    c. defines a `List` of type `Number` and `Serializable` or any of its
    subtypes

    d. gives a compile time error

    > answer:d

8.  **How do you write a method that takes an array of objects and a collection
    and puts all objects in the array into the collection?**

        a. static void fromArrayToCollection(Object[] a, Collection<Object> c)

        b. static void fromArrayToCollection(Object[] a, Collection<?> c)

        c. static <T> void fromArrayToCollection(T[] a, Collection<T> c)

        d. static void fromArrayToCollection(T[] a, Collection<T> c)

    > answer:c

9.  **Consider this generic method that simply returns its argument:**

        <T> T passThrough(T obj) {
            return obj;
        }
        String s1 = "Hello";

    **Which of the following statements are valid:**

        a. String s2 = this.<String>passThrough(s1);

        b. String s2 = passThrough(s1);

        c. Object o2 = passThrough((Object) s1);

        d. s1 = passThrough((Object) s1);

        e. s1 = (String) passThrough((Object) s1);

        f. String s2 = <String>passThrough(s1);

    > answer:a,b,c,e

10. **Which of the following statements are correct?**

    a. The erasure of a bounded type parameter is its first bound

    b. The erasure of an unbounded type parameter is Object

    c. The erasure of <T> is Object

    d. The erasure of <T extends Number> is Object

    e. The erasure of <T extends Number & Cloneable> is Cloneable

    > answer:a,b,c

11. **Two generic methods have override-equivalent signatures if**

    a. their names are different

    b. their signatures are different

    c. the erasures of their signatures are different

    d. their signatures are the same OR the erasures of their signatures are the
    same

    > answer:d

12. **What happens if two generic methods have same name and same
    override-equivalent signatures:**

    a. the methods are overloaded

    b. compile time error

    > answer:b

13. **Which of the following statements are true:**

    a. The two generic methods are overloaded if they have same name but do not
    have override-equivalent signatures.

    b. Subtype method overrides a super type method if the two methods have the
    same name and have override-equivalent signatures.

    c. The following two methods will be overloaded

            void m(String s) {}

             <T extends String> void m(T t) {}

    d. The following two methods will be overloaded

            void m(int x) {}

            void m(T t) {}

    e. The following two methods will be overloaded

            void m(T t) {}

            void m(Object o) {}

    > answer:a,b,d

14. **How many methods are overridden by the Derived class below:**

        class Base<T> {
             void m(int x) {}
             void m(T t) {}
             void m(String s) {}
             <N extends Number> void m(N n) {}
             void m(SingleLinkQueue<?> q) {}
        }
        class Derived<T> extends Base<T> {
             void m(Integer i){}
             void m(Object t) {}
             void m(Number n) {}
        }

    a. 3

    b. 2

    c. 1

    d. 0

    > answer:b

15. **Consider the following code:**

        void m(String key, Object val) {
                 ...
        }
        <S, T extends Number> void m(S key, T val) {
              ...
        }

    **In each of the following method invocations, which m() method is called:**

    a. m("hello", "world");

    (i) non-generic form of m()

    (ii) generic form of m()

    (iii) compile time error

    b. m(new Object(), 29);

    (i) non-generic form of m()

    (ii) generic form of m()

    (iii) compile time error

    c. m("hello", Integer.valueOf(29));

    (i) non-generic form of m()

    (ii) generic form of m()

    (iii) compile time error

    > answer:a.i , b.ii, c.iii
