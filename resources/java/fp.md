1.  **Which of the following are side effects: (can select multiple)**

    a. mutation of parameters reflected outside the function

    b. mutation of parameters not reflected outside the function

    c. printing to the console or to any device

    d. writing to files, databases, networks

    e. throwing an exception

    f. returning a value

    > answers : a, c, d, e

2.  **In theory, functional programming is writing programs using functions that:**

    a. never return a value

    b. have no bugs

    c. have no side effects

    d. give expected results

    > answer : c

3.  **Which of the following code snippets are "functional":**

            a. public static int add(int a, int b) {
                  log(String.format("Returning %s as the result of %s + %s", a + b, a, b));
                  return a + b;
               }


            b. public static int multiply(int a, int b) {
                  return a + b;
               }


            c. public static int div(int a, int b) {
                  return a / b;
                }


            d. public static void add(int a, int b) {
                  int c = a + b;
                  System.out.println(c);
               }

    > answer : b

4.  **If function `foo` mutates local variables, is `foo` functional?**

    > answer: yes

5.  **Which of the following options apply to referentially transparent code:(can select multiple)**

    a. It can throw an Exception

    b. It does not depend on external world like files, database, console

    c. It will always return the same value for the same argument

    d. It mutates the state outside the function

    > answers : b, c

6.  **The following code is**

        public class DonutShop {
              public static Donut buyDonut(CreditCard creditCard) {
                  Donut donut = new Donut();
                  creditCard.charge(Donut.price);
                  return donut;
               }
         }

    a. imperative

    b. functional

    c. referentially transparent

    d. procedural

    > answer : a

7.  **The relation between two sets, domain and codomain, is said to be a function, if**

    a. each element of the domain set has at least one corresponding element in the codomain

    b. each element of the domain set has exactly one corresponding element in the codomain set

    c. domain and codomain sets have no common elements

    d. domain and codomain sets have equal number of elements

    > answer : b

8.  **Which of the following is true: (can select multiple)**

    a. Each domain element need not have a corresponding element in codomain

    b. Two elements of the codomain cannot correspond to same element of domain

    c. Few elements of the codomain may not have any corresponding element in domain

    d. An element of the domain cannot correspond to multiple elements in the codomain

    > answers : b,c

9.  **If f(x) = x + 2 and g(x) = x \* 2 , then f ° g (5) = f(g(5)) = ?**

    a. 12

    b. 14

    c. 10

    d. 15

    > answer : a

10. **f(x)(y) is the curried form of the function f(x, y). It means that:**

    a. Both the arguments are considered one after another separately

    b. The arguments are multiplied

    c. Any one of the arguments is considered

    d. domain and codomain are interchanged

    > answer : a

11. **Which of the following applies to a pure function: (can select multiple)**

    a. It must not mutate any object/data outside the function.

    b. It might mutate its argument.

    c. It might throw errors or exceptions.

    d. It may or may not return a value.

    e. When called with the same argument, it must always return the same result.

    > answers : a, e

12. **A function that depends on its argument "a" and any non-mutating final class variable "b" can become pure function by:**

    a. considering b as a supplemental argument.

    b. considering the class itself as a supplemental implicit argument

    c. using the keyword pure

    d. cannot become pure function

    > answer: either a or b

13. **Which of the following principle can be used to create functions that can be manipulated, like passed as arguments to other methods?**

    a. define an interface with a single method then implement this method in an anonymous class

    b. define them as static functions

    c. define the derived class and use function overriding

    d. define the class with function overloading

    > answer : a

14. **How to create a method to triple an integer value using the following interface:**

            public interface Function {
                int apply(int arg);
            }

15. **Function composition is a binary operation on functions, just as addition is a binary operation on numbers. So you can compose two functions f1, f2 (created using the above interface Function) programmatically as:**

            a. Function compose(final Function f1, final Function f2) {
                  return new Function() {
                     @Override
                     public int apply(int arg) {
                        return apply(f1.f2(arg));
                     }
                  };
               }


            b. Function compose(final Function f1, final Function f2) {
                  return new Function() {
                      public int apply(int arg) {
                        return f1.apply(f2.apply(arg));
                      }
                  };
               }


            c. Function compose(final Function f1, final Function f2) {
                  return new Function() {
                        @Override
                        public int apply(int arg) {
                              return apply(apply(arg));
                        }
                  };
               }

           d. Function compose(final Function f1, final Function f2) {
                   return new Function() {
                        @Override
                        public int apply(int arg) {
                              return f1.apply(f2.apply(arg));
                        }
                    };
               }

         > answer : d

16. **In functional programming, composing functions is powerful because functions can be composed without being evaluated. True or false?**


    > answer : b

17. **If we compose several thousand functions into a single one, then it will**

    a. improve the performance

    b. result in an exception

    c. overflow the stack

    d. improves the readability of the program

    > answer : c

18. **The following function can be converted to lambda function as:**

        Function<Integer, Integer> square = new Function<Integer, Integer>() {
            @Override
            public Integer apply(Integer arg) {
                  return arg * arg;
            }
        };

        a. Function<Integer, Integer> square = x -> x * x;

        b. Function<Integer, Integer> square = x * x;

        c. Function<Integer, Integer> square(){ x -> x * x };

        d. Function<Integer, Integer> square = x = x * x;

    > answer : a
