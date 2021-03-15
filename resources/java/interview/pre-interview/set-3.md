1. Assuming `createArray` is implemented the following way

```
public static void createArray(Integer[] arr, int size) {
  arr = new Integer[size];
}
```

After the execution of the following statements

```
  Integer[] ints = null;
  createArray(ints, 2);

```

`ints` will be

a) null
b) array of three values 0, 0, 0
c) array of three values null, null, null
d) none of the above

Answer: a

2. Does the following code fragment legal(compiles fine if part of a method)?

```
Integer[] ints = new Integer[3];
Object[] objs = ints;
```

Answer: yes

3. Does the following code

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
b) throw an exception at runtime
c) does not compile
d) compiles and runs fine

Answer: b (of course, this implies a too)

4. Which of the following are some of the advantages of exceptions over returning an error value?

a) Separates error handling code from program logic(business logic)
b) is more type safe.
c) Handling errors becomes necessary.
d) All of the above.

Answer: d

5. A stream in Java can be traversed/iterated

a) only once
b) any number of times

Answer: a
