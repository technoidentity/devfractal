1.  Which of the following programming concepts are central to the design of
    Java 8:

    a. Streams API b. The ability to pass methods (your code) as arguments to
    other methods c. Parallelism simplified d. All of the above

    > answer : d

2.  The method reference :: syntax means a. use the method as a value b. use the
    method as a operator c. use the method as is d. use the method as static

    > answer : a

3.  Write the code to filter all the hidden files in a directory:

         a. File hiddenFiles = new File(".").listFiles(File::isHidden);
         b. File[] hiddenFiles = new File(".").listFiles(File::isHidden);
         c. File[] hiddenFiles = new File(".").listFiles(isHidden);
         d. File hiddenFiles = new  File(".").listFiles(isHidden);

    > answer : b

4.  Consider a variable `inventory` that contains a `List` of apples and a class
    `Apple` that includes methods `getColor()` and `getWeight()`. Which of the
    following is a better way to write method(s) that returns the list of
    filtered apples based on color or weight:

         a. write two filter methods: one that filters apples based on color and
            another that filters apples based on weight
            public static List<Apple> filterGreenApples(List<Apple> inventory) {...}
            public static List<Apple> filterHeavyApples(List<Apple> inventory) {...}
         b. write a single filter method that filters apples based on the
            predicate function passed to it as an argument
            static List<Apple> filterApples(List<Apple> inventory, Predicate<Apple> p)
            {...}

    > answer : b

5.  Lambdas should be used for(can select multiple): a. methods that are used
    only once or twice b. methods that are short c. methods that consist of
    multiple lines d. methods that are difficult to define

> answers : a,b

7.  Which of the following is true regarding Streams API(can select multiple):
    a. It provides internal iteration b. It provides external iteration c. It
    supports parallel processing on multi core computers d. It uses
    multi-threaded code that is error-prone and difficult

    > answer : a,c

8.  The parallelism using Streams API works only if the methods passed to
    library methods: a. have no interaction during execution between components
    b. have mutable shared objects c. use functions as first-class values d. use
    multiple threads

    > answer : a

9.  If an interface method is preceded by the keyword _default_, then it means
    that: a. an implementing class doesn’t need to implement it b. all concrete
    classes must implement it c. only one concrete class can implement it d. an
    implementing class must implement it

    > answer : a

10. The behavior parameterization means: a. the ability to define a method that
    takes multiple behaviors as parameters and returns the same result b. the
    ability to define a method that takes multiple behaviors as parameters and
    uses them to accomplish different behaviors. c. the ability to define a
    method that takes a single parameter and returns different behaviors as the
    result d. the ability to define a method that is implemented by multiple
    classes

    > answer : b

11. Consider the code:

         public interface ApplePredicate {
            boolean test (Apple apple);
         }

        public static List<Apple> filterApples(List<Apple>
        inventory, ApplePredicate p) {...}

    If we need to filter apples based on multiple different criteria, then:

    a. we need to declare multiple `test` methods in the `ApplePredicate` to
    represent different selection criteria b. we need to create multiple
    `filterApples()` methods to represent different selection criteria c. We
    need to declare multiple implementations of `ApplePredicate` to represent
    different selection criteria and then create and pass `ApplePredicate`
    object corresponding to the selected criteria to the `filterApples()` method
    d. we need to pass multiple parameters to represent different selection
    criteria

    > answer : c

12. Anonymous classes allow you to a. extend multiple classes b. define nested
    classes c. instantiate multiple classes at the same time d. declare and
    instantiate a class at the same time

    > answer : d

13. write the following code using lambdas:

         Thread t = new Thread(new Runnable() {
            public void run() {
              System.out.println("Hello world");
            }
         });

        a. Thread t = new Thread(System.out.println("Hello world"));
        b. Thread t = new (() -> System.out.println("Hello world"));
        c. Thread t = new Thread(() -> System.out.println("Hello world"));
        d. Thread t = Thread(() -> System.out.println("Hello world"));

    > answer : c

14. The basic syntax of a lambda is a. (parameters) -> expression b.
    (parameters) -> { statements; } c. both d. none

    > answer : c

15. A lambda is (multiple selection): a. a function b. a class c. a built in
    library d. boilerplate code for an interface e. anonymous f. predefined

> answers : a,e

16. which of the following are not valid lambda expressions?(multiple selection)

          a. (Integer i) -> return "Abc" + i;
          b. (String s) -> { "xyz"; }
          c. () -> {}
          d. (String s) -> s.length()
          e. (int a, int b) -> a * b


    > answer: a,b

17. Which of these interfaces are functional interfaces?(multiple selection)

          a. public interface Adder {
               int add(int a, int b);
             }
          b. public interface SmartAdder extends Adder {
               int add(double a, double b);
             }
          c. public interface Nothing {
             }
          d. public interface Comparator<T> {
               int compare(T o1, T o2);
             }
          e. public interface Runnable {
               void run();
             }

    > answers :a,d,e

18. Consider the code:

        public static void process(Runnable r) {
          r.run();
        }

    which of the following is valid:

        a. process(System.out.println("Hello World"));
        b. process({} -> System.out.println("Hello World"));
        c. process(() -> {System.out.println("Hello World")});
        d. process(() -> System.out.println("Hello World"));

    > answer : d

19. What is the function descriptor of the following lambda expression:

        (Apple a1, Apple a2) -> a1.getWeight().compareTo(a2.getWeight())

        a. (Apple, Apple) -> int
        b. (Apple) -> void
        c. (int) -> void
        d. (Apple, Apple) -> boolean

    > answer : a

20. Which of the following are valid uses of lambda expressions?

        a.  execute(() -> {});
            public void execute(Runnable r) {
                r.run();
            }
        b. public Callable<String> fetch() {
               return () -> "hello";
           }
        c. Predicate<Apple> p = (Apple a) -> a.getWeight();
           public interface Predicate<T> {
               boolean test (T t);
           }

    > answer : a,b

21. If @FunctionalInterface annotation is used to annotate a non functional
    interface, then a. nothing happens b. warning message is displayed c. error
    message is displayed d. runtime error occurs

    > answer : c

22. How can you use `Consumer<T>` interface to create a method `forEach` using
    lambda to print all the elements of the list:

          a. public <T> void forEach(List<T> list, Consumer<T> c) {
              for(T t: list) {
                  c.print(t);
              }
             }
          b. public <T> void forEach(List<T> list) {
              for(T t: list) {
                  print(t);
              }
             }
          c. public void forEach(List list, Consumer c) {
              for(t: list) {
                  System.out.println(t);
              }
             }
          d. public <T> void forEach(List<T> list, Consumer<T> c) {
              for(T t: list) {
                  c.accept(t);
              }
             }


    answer : d

23. Which of the following is better:

        a. IntPredicate evenNumbers = (int i) -> i % 2 == 0;
           evenNumbers.test(1000);

        b. Predicate<Integer> evenNumbers = (int i) -> i % 2 == 0;
           evenNumbers.test(1000);

        c. Predicate evenNumbers = (int i) -> i % 2 == 0;
           evenNumbers.test(1000);

        d. ToIntPredicate evenNumbers = (int i) -> i % 2 == 0;
           evenNumbers.test(1000);


        answer : a

24. Which functional interface would you use for the lambda-expression
    signatures T -> R a. IntBinaryOperator b. Function<T, R> c. Consumer<T> d.
    BiFunction<T, U, R>

    answer : b

25. What will be the matching functional interface for the lambda expression :
    (List<String> list) -> list.isEmpty() a. Function<String,Integer> b.
    Predicate<List> c. ToIntFunction<String> d. Predicate<List<String>>

    answer : d

26. Which of the following is not valid? a. Object o = () -> {
    System.out.println("Tricky example"); }; b. Predicate<String> p = (String s)
    -> list.add(s); c. Consumer<String> b = (String s) -> list.add(s); d.
    Runnable r = () -> { System.out.println("Tricky example"); };

    answer : a

27. What are equivalent method references for the lambda expression

        BiPredicate<List<String>, String>
        contains = (list, element) -> list.contains(element);

        a. BiPredicate<List> contains = List::contains;
        b. BiPredicate<List<String>> contains = List::contains;
        c. BiPredicate<List<String>, String, String> contains = List::contains;
        d. BiPredicate<List<String>, String> contains = List::contains;

    answer : d

28. Which of the following are true?(can select multiple) a. Lambda expressions
    can capture local variables that are assigned to only once. b. The Java
    compiler deduces what functional interface to associate with a lambda
    expression from its surrounding context c. the same lambda expression can be
    associated with different functional interfaces if they have a compatible
    abstract method signature. d. The functional interfaces are not allowed to
    throw a checked exception

    answer : all are true.

29. If you have a two-argument constructor, Apple (Color color, Integer weight)
    , it fits the signature of the:

            a. BiFunction<Color, Integer> c = Apple::new;
               Apple a = c.apply(GREEN, 110);
            b. Function<Color, Integer> c = Apple::new;
               Apple a = c.apply(GREEN, 110);
            c. BiFunction<Color, Integer, Apple> c = Apple::new;
               Apple a = c.apply(GREEN, 110);
            d. Function<Color, Integer, Apple> c = Apple:new;
               Apple a = c.apply(GREEN, 110);

            answer  : c

30. How can you sort a list of apples in variable `inventory` with different
    ordering strategies using lambdas and `sort()`:

        a. inventory.sort(Apple::getWeight);
        b. inventory.sort(a1.getWeight().compareTo(a2.getWeight()));
        c. Comparator<Apple> c = Comparator.comparing((Apple a) -> a.getWeight());
        d. Comparator<Apple> c = Comparator.compareTo((Apple a) -> a.getWeight());

        answer : c

31. Consider the various utility methods that do text transformation on a letter
    represented as a String :

        public class Letter{

            public static String addHeader(String text) {...}
            public static String addFooter(String text) {...}
            public static String checkSpelling(String text) {...}
        }

    How can we create a pipeline that first adds a header, then checks spelling,
    and finally adds a footer :

        a. Function<String, String> transformationPipeline =
        addHeader.checkSpelling.addFooter;
        b. Function<String, String> transformationPipeline =
        addHeader.andThen(checkSpelling).andThen(addFooter);
        c. Function<String, String> transformationPipeline =
        addHeader.compose(Letter::checkSpelling).compose(Letter::addFooter);
        d. Function<String, String> transformationPipeline =
        addHeader.andThen(Letter::checkSpelling).andThen(Letter::addFooter);

    answer : d
