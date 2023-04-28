1.  **Exception handling is error handling. True or false?**

    > answer: true

2.  **Pick true statements.**

    a. Array types are polymorphic i.e. if `B` inherits from `A`, then B[] is A.
    b. This causes a lot of trouble for Java programmers.

    > answer: both true.

3.  **Which of the following are some of the advantages of exceptions over
    returning an error value?**

    a. Separates error handling code from program logic(business logic) b. is
    more type safe. c. Handling errors becomes necessary. d. All of the above.

    > answer: d

4.  **What are the advantages of return an object representing an error like
    Result/Either/Try/Option instead of exceptions?**

    a. Is more type safe. b. Is more composable. c. Is more functional. d. All
    of the above

    > answer: d

5.  **Which of the following is preferable in functional Java?**

    a. throw unchecked exception b. throw checked exception c. return error code
    d. return an object representing both value and an error like Option or
    Result.

    > answer: c

6.  **Let's assume you are writing a function `find` to find a `value` within a
    `collection`. If the collection doesn't contain the `value`, you should**

    a. return null b. throw an exception c. Return `Option` d. Return a default
    value like 0

    > answer: c

7.  **Which of the following statements are true, if method `foo` calls method
    `bar` throwing checked exceptions `A` and `B`** a. Almost never catch
    unchecked exceptions b. Always catch checked exceptions. For example, `foo`
    must catch both `A` and `B` c. Only catch those checked exceptions you can
    handle, rest add it to throws clause. If `foo` can only handle `A`, then
    catch `A` and add `B` to throws clause. d. Always catch all exceptions and
    transform them if needed. e. If possible, avoid checked exceptions.

    > answer: a, c, e (it's fine to not include e).

8.  **Mostly all exceptions you create should extend the class**

    a. Error

    b. Exception

    c. RuntimeException

    d. Throwable

    > answer:b

9.  **When an exception is thrown, next statement to be executed will be:**

    a. statement immediately below the throw statement

    b. try block

    c. catch block

    d. none

    > answer:c

10. **Which of the following are true:**

    a. A method can only catch those exceptions that are listed in its throws
    clause

    b. A method can only throw checked exceptions that are listed in its throws
    clause

    c. A method that does not include throws clause can throw any exception

    d. A method that does not include throws clause cannot throw any checked
    exception

    e. static initializers and static initialization blocks cannot throw checked
    exceptions

    f. the throws clause should be as complete and specific as possible, listing
    all the exceptions it can throw

    g. the throws clause should only specify a super class that includes all the
    exceptions it throws

    > answer: b,d,e,f

11. **If a method `B` calls a method `A` which includes some exception `E` in
    its throws clause then, method `A` must**

    a. Catch the exception and handle it.

    b. Catch the exception and map it into one of the exceptions in its own
    throws clause.

    c. Declare the exception in its throws clause and let the exception pass
    through.

    d. any one of the above

    > answer:d

12. **Consider the following code:**

        try {
            ...
        } catch (IndexOutOfBoundsException e) {
           ...
        } catch (IOException e) {
          ...
        } finally {
          ...
        }

    **If IOException occurred, which parts of the above code will be executed:**

    a. try block completely executes + finally block

    b. try block until exception occurs + corresponding catch block

    c. try block until exception occurs + both the catch blocks

    d. try block until exception occurs + corresponding catch block + finally

    > answer : d

13. **What is the correct order for writing multiple catch blocks?**

    a. alphabetical order

    b. super type first, followed by all subtypes of exceptions

    c. subtypes first, followed by super type of exceptions

    d. random order

    > answer: c

14. **finally block executes:**

    a. only if exception occurs

    b. only if exception does not occur

    c. always

    d. never

    > answer:c

15. **It's better to depend on finally ( and using) instead of `finalize`. True
    or false?**

    > answer: true

16. **`initCause()` method is used to**

    a. initialize the exception to null

    b. initialize the cause of one exception as another exception

    c. throw the initial exception

    d. catch the initial exception

    > answer:b

17. **What is the meaning of `assert expression [detail];` statement?**

    a. The program abruptly terminates if expression results in false

    b. The program abruptly terminates if expression results in true

    c. If expression evaluates to true, then AssertionError is thrown and
    _detail_ error message is passed in it.

    d. If expression evaluates to false, then AssertionError is thrown and
    _detail_ error message is passed in it.

    > answer : d

18. **Assertions are used for the following**

    a. avoid state corruption

    b. enforce invariants about the arguments to methods not represented by
    their type

    c. test for conditions assumed to be true

    d. provide proper documentation

    e. simpler and faster way to handle errors

    f. allow the option of disabling error handling when needed.

    > answer : a, b, c

19. **How do you assert that the distance between two points is not negative?**

    a. assert distance

    b. assert (distance) : "Negative distance";

    c. assert (distance <= 0) : "Negative distance";

    d. assert (distance >= 0) : "Negative distance";

    > answer : d

20. **Which of the following statements asserts that the program control never
    reaches the end of the method?**

        a. int method1(...) {
               ...
              assert false;
          }

        b. int method1(...) {
            ...
            assert true;
            return -1;
          }

        c. void method1(...) {
            ...
            throw new AssertionError("some msg");
          }

        d. int method1(...) {
            ...
            assert false;
            return -1;
          }

    > answers:c,d

21. **Which of the following statements are true?**

    a. Assertion evaluation is off by default.

    b. Assertions cannot be turned on and off.

    c. You should only turn off assertions in code where they have very
    noticeable performance effects.

    d. It is recommended not to use assertions

    > answers:a,c

22. **The standard command line options to enable and disable assertions are:**

    a. -onassertions , -offassertions

    b. -enableassertions, -disableassertions

    c. -toggleassertions

    d. -addassertions, -removeassertions

    > answer:b

23. **Which of the following ways can be used to completely remove the assertion
    related code in your program?**

    a. we need to manually edit the code and remove the assertions.

    b. using the below code snippet:

            private static final boolean doAssert = false;
            if (doAssert)
              assert (size > origSize);

    c. using the below code snippet:

            private static final boolean doAssert = true;
            if (doAssert)
              assert (size > origSize);

    d.we can disable the assertions and the code gets automatically removed

    > answers:a,b
