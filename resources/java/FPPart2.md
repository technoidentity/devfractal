1.  **In functional programming, which of the following are true:(can select
    mulitple)** a. A function can have several arguments. b. A function can have
    only one tuple of arguments. c. The cardinality of a tuple may be whatever
    you need. d. The arguments can be applied one by one, each application of
    one argument returning a new function, except for the last one.

    > answer:b,c,d

2.  **What is currying?** a. the arguments are applied one by one, each
    application of one argument returning a new function, except for the last
    one. b. multiple functions are written and they are composed into a single
    one.

    > answer : a

3.  **How do you write a curried function to add two integers?** a. Function<
    Integer, Integer> add = x + y; b. Function<Integer, Function<Integer,
    Integer>> add = x -> y -> x + y; c. Function<Integer, Function<Integer,
    Integer>> add = x + y; d.Function<Integer, Integer>> add = x, y = x + y;

    > answer : b

4.  **How do you apply the curried function `add` to add two integer values?**
    a. add.apply(3).apply(5) b. apply.add(3).add(5) c. add.apply(3).add.apply(5)
    d. apply(3).add.apply(5)

    > answer : a

5.  **A higher-order function is a function that** a. computes high order
    mathematical calculations b. takes functions as its arguments and returns
    functions c. is implemented by multiple classes d. modifies an existing
    function dynamically

    > answer : b

6.  **How do you compose two functions `triple` that triples its integer
    argument and `square` that squares its integer argument?**

        a. Function<Integer> triple = x -> x * 3;
           Function<Integer> square = x -> x * x;
           Function<Integer> f = compose.(square).(triple);

        b. Integer triple = x -> x * 3;
           Integer square = x -> x * x;
           Integer f = compose.(square).(triple);

        c. Function<Integer, Integer> triple = x -> x * 3;
           Function<Integer, Integer> square = x -> x * x;
           Function<Integer, Integer> f = compose.apply(square).apply(triple);

        d. Function<Integer, Integer> triple = x * 3;
           Function<Integer, Integer> square = x * x;
           Function<Integer, Integer> f = compose.apply(square).apply(triple);

    > answer : c

7.  **In Java, which of the following are true?(can select multiple)** a. you
    can create polymorphic classes, interfaces, and methods. b. you can define
    polymorphic properties. c. you can cast a Function<Integer, Integer> to a
    Function<Object, Object> d. all parameterized types are said to be invariant
    on their parameter

    > answer : a,d

8.  **How do you define a polymorphic version of the compose function?**

        a. <T, U, V>
          Function<Function<T, U>,Function<Function<V, T>, Function<V, U>>>
          higherCompose = f -> g -> x -> f.apply(g.apply(x));

        b. static <T, U, V>
           Function<Function<U, V>Function<Function<T, U>,Function<T, V>>>
           higherCompose() {
            return f -> g -> x -> f.apply(g.apply(x));
           }

        c. public static <T, U, V>
           Function<Function<T, U>, Function<Function<U, V>,Function<T, V>>>
           higherAndThen() {
            return f -> g -> x -> g.apply(f.apply(x));
           }

        d. static <T, U, V>
           Function<Function<U, V>,Function<Function<T, U>,Function<T, V>>>
           higherCompose() {
            return tuFunc -> uvFunc -> t -> tuFunc.apply(uvFunc.apply(t));
           }

    > answer : c

9.  **Consider the following code**

        Function<Double, Double> f = x -> Math.PI / 2 - x;
        Function<Double, Double> sin = x -> Math.sin(x);
        Double  cos = Function.higherCompose(f, sin).apply(2.0);

    **We can write the function `cos` using anonymous functions as**

        a. Double cos = Function<Double, Double, Double>
        higherCompose().apply(Math.PI / 2 - z)
        .apply(Math::sin).apply(2.0);

        b. Double cos = Function.<Double, Double, Double>
        higherCompose().apply(z -> Math.PI / 2 - z)
        .apply(Math::sin).apply(2.0);

        c. Double cos = higherCompose().apply(z -> Math.PI / 2 - z)
        .apply(z->Math::sin(z)).apply(2.0);

        d. Double cos = Function.<Double,Double>
        higherCompose().apply(z -> Math.PI / 2 - z)
        .apply(Math::sin).apply(2.0);

    > answer : b

10. **It is preferable to use method references over anonymous functions
    whenever possible. True or False?**

    > answer : true

11. **Which of the following are true(can select multiple)** a. You can define
    functions locally in methods b. You can define methods within methods. c.
    You can define functions inside functions using lambdas d. Local functions
    are always anonymous. e. Using helper functions in Java methods allow you to
    simplify the code by abstracting portions of it. f. Using named functions
    implies writing types explicitly g. A lambda can access a local variable
    only if it’s final.

    > answers : a, c, e, f, g

12. **Write a functional method to partially apply a curried function of two
    arguments to its first argument.**

         a. <A, B, C> Function<B, C>
            partialA(A a, Function<A,Function<B, C>> f) {
               return f.apply(a);
            }

         b. Function<B, C>
            partialA(A a, Function<A,B,C> f) {
               return f.apply(a);
            }

         c. <A, B, C> Function<B, C>
            partialA(A a, Function f) {
               return f.apply(a);
            }

         d. Function<B, C>
            partialA(A a, Function<A,Function<B, C>> f) {
               return f.apply(a);
            }

    > answer : a

13. **Write a method to partially apply a curried function of two arguments to
    its second argument.**

          a. <A, B, C> Function<A, B>
             partialB(B b, Function<A, Function<B, C>> f) {
               return a -> f.apply(a);
             }

          b. <A, B, C> Function<A, C>
             partialB(B b, Function<A, Function<B, C>> f) {
               return a -> f.apply(a).apply(b);
             }

          c. <A, B, C> Function<A, B>
             partialB(B b, Function<A,B, C> f) {
               return a -> f.apply(a).apply(b);
             }

          d. Function<A, C>
             partialB(B b, Function<A, Function<B, C>> f) {
               return a -> f.apply(a).apply(b);
             }

    > answer : b

14. **Convert the following method into a curried function:**

            <A, B, C, D> String func(A a, B b, C c, D d) {
               return String.format("%s, %s, %s, %s", a, b, c, d);
            }

           a. <A,B,C,D> Function<A, Function<B, C, Function<D, String>>> f() {
               return a -> b -> c -> d -> String.format("%s, %s, %s, %s", a, b, c, d);
            }

            b. <A,B,C,D> Function<A, B, Function<C, Function<D, String>>> f() {
               return a -> b -> c -> d -> String.format("%s, %s, %s, %s", a, b, c, d);
            }

            c. <A,B,C,D> Function<A, Function<B, Function<C, Function<D,
            Function<String>>>>> f() {
               return a -> b -> c -> d -> String.format("%s, %s, %s, %s", a, b, c, d);
            }

            d. <A,B,C,D> Function<A, Function<B, Function<C, Function<D,
            String>>>> f() {
               return a -> b -> c -> d -> String.format("%s, %s, %s, %s", a, b, c, d);
            }

    > answer : d

15. **Write a method to curry a function of a Tuple<A, B> to C**

         a. <A, B, C> Function<A, Function<B, C>> curry(Function<Tuple<A, B>, C> f) {
               return a -> b -> f.apply(new Tuple<>(a, b));
            }

         b. <A, B, C> Function<A, Function<B, C>> curry(Function<Tuple<A, B>, C> f) {
               return a -> b -> f.apply(new Tuple<>(a, b));
            }

         c. <A, B, C> Function<A, Function<B, C>> curry(Function<Tuple<A, B>, C> f) {
               return a -> b -> f.apply(new Tuple<>(a, b));
            }

         d. <A, B, C> Function<A, Function<B, C>> curry(Function<A, B, C> f) {
               return a -> b -> f.apply(new Tuple(a, b));
            }

    > answer : c

16. **Which of the following methods swap the arguments of a curried function?**

         a. public static <T, U, V> Function<U, Function<T, V>>
            reverseArgs(Function<T, Function<U, V>> f) {
               return u -> t -> f.apply(t).apply(u);
            }

         b. public static Function<U, Function<T, V>>
            reverseArgs(Function<T, Function<U, V>> f) {
               return f.apply(t).apply(u);
            }

         c. public static <T, U, V> Function<U, T, V>
            reverseArgs(Function<T, U, V> f) {
               return f.apply(t).apply(u);
            }

         d. public static <T, U, V> Function<U, T, V>
            reverseArgs(Function<T, U, V> f) {
               return u -> t -> f.apply(t).apply(u);
            }

    > answer : a

17. **Which of the following are true?(can select multiple)** a. The state of
    the computation is pushed onto the stack for each recursive function call b.
    The number of recursive steps is unlimited in Java. c. The default size of
    the stack is very large compared to the size of the heap. d. The objects are
    stored in the heap. e. Java does not use memoization internally. f. It is
    possible to create heap-based recursion in Java g. It is recommended to
    write anonymous recursive functions

    > answer : a, c, f

18. **In functional programming, how do you write a recursive factorial
    function?**

         a. Function<Integer, Integer>
            factorial = n -> n <= 1 ? n : n * factorial.apply(n – 1);

         b. public Function<Integer, Integer> factorial;
            {
               factorial = n -> n <= 1 ? n : n * factorial.apply(n - 1);
            }

         c. public final Function<Integer, Integer>
            factorial = n -> n <= 1 ? n : n * this.factorial.apply(n - 1);

         d. public int factorial(int n) {
               return n == 0 ? 1 : n * factorial(n - 1);
            }

    > answer : c

19. **When we apply, operations to functions, we’ll need a neutral element, or
    identity element, for these operations. An identity element will act as**

    a. 0 for addition b. 1 for multiplication c. empty string for string
    concatenation. d. all of the above

    > answer : d

20. **The identity function can be added to the definition of a class in the
    form of a method named `identity` , returning the `identity` function as:**

         a. static Function<T, T> identity() {
               return t -> t;
            }

         b. static <T> Function<T> identity() {
               return t -> t;
            }

         c. static <T> identity() {
               return t -> t;
            }

         d. static <T> Function<T, T> identity() {
               return t -> t;
            }

    > answer : d

21. **Functional interfaces can have:** a. only one abstract method b. only one
    static method c. only one final method d. all of the above

    > answer : a

22. **Debugging functional programs that use lambdas extensively is somewhat
    more difficult than debugging imperative programs. True or false?**

    > answer : true

23. **Debugging functional programs can be made better by:** a. extensively
    using breakpoints b. extensively unit testing each component c. providing
    detailed documentation d. using assert statements

    > answer : b
