
1. **In functional programming, which of the following are true:**
   a. A function can have several arguments.
   b. A function can have only one tuple of arguments.
   c. The cardinality of a tuple may be whatever you need.
   d. The arguments can be applied one by one, each application of one argument returning a new function, except for the last one.

    > answer:b,c,d

2. **What is currying?**
   a. the arguments are applied one by one, each application of one argument returning a new function, except for the last one.
   b. multiple functions are written and they are composed into a single one.

   > answer : a

4. **How do you write a curried function to add two integers?**
   a. Function< Integer, Integer> add = x + y;
   b. Function<Integer, Function<Integer, Integer>> add = x -> y -> x + y;
   c. Function<Integer, Function<Integer, Integer>> add = x + y;
   d.Function<Integer, Integer>> add = x, y = x + y;

    > answer : b

5. **How do you apply the curried function `add` to add two integer values?**
   a. add.apply(3).apply(5)
   b. apply.add(3).add(5)
   c. add.apply(3).add.apply(5)
   d. apply(3).add.apply(5)

    > answer : a

6. **A higher-order function is a function that**
    a. computes high order mathematical calculations
    b. takes functions as its arguments and returns functions
    c. is implemented by multiple classes
    d. modifies an existing function dynamically

    > answer : b

7. **How do you compose two functions `triple` that triples its integer argument and `square` that squares its integer argument?**

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

      >answer : c

  8. **In Java, which of the following are true?**
      a. you can create polymorphic classes, interfaces, and methods.
      b. you can define polymorphic properties.
      c. you can cast a Function<Integer, Integer> to a Function<Object, Object>
      d. all parameterized types are said to be invariant on their parameter
      > answer : a,d

9. **How do you define a polymorphic version of the compose function?**

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

  9. **Consider the following code**

          Function<Double, Double> f = x -> Math.PI / 2 - x;
          Function<Double, Double> sin = x -> Math.sin(x);
          Double  cos = Function.compose(f, sin).apply(2.0);

      **We can write the function `cos` using anonymous functions as**

          a. Double cos = Function<Double, Double, Double>
          compose().apply(Math.PI / 2 - z)
          .apply(Math::sin).apply(2.0);

          b. Double cos = Function.<Double, Double, Double>
          compose().apply(z -> Math.PI / 2 - z)
          .apply(Math::sin).apply(2.0);

          c. Double cos = compose().apply(z -> Math.PI / 2 - z)
          .apply(z->Math::sin(z)).apply(2.0);

          d. Double cos = Function.<Double,Double>
          compose().apply(z -> Math.PI / 2 - z)
          .apply(Math::sin).apply(2.0);

      > answer : b

  10. **It is preferable to use method references over anonymous functions whenever possible. True or False?**

      > answer : true

  11. **Which of the following are true**
      a. You can define functions locally in methods
      b. You can define methods within methods.
      c. You can define functions inside functions using lambdas
      d. Local functions are always anonymous.
      e. Using helper functions in Java methods allow you to simplify the code by abstracting portions of it.
      f. Using named functions implies writing types explicitly

      > answers : a, c, e, f


