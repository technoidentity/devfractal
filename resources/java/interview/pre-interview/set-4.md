1. Assuming `swap` is implemented the following way.

```
public static void swap(Object x, Object y) {
  Object t = x;
  x = y;
  y = t;
}
```

After execution of the following statements

```
Point x = new Point(1, 2);
Point y = new Point(3, 4);
swap(x, y);
```

`x` and `y` will be

a) (1, 2) and (3, 4)
b) (3, 4) and (1, 2)
c) (2, 1) and (4, 3)
d) (1, 3) and (2, 4)

Answer: a

2. Assuming the following code

```
class Foo {
  public void f() {}
}

class Bar extends Foo {
  public void g() {}
}

// code fragment in a method
Bar bar = new Bar();
Foo foo = bar;
```

Select all the statments that are legal

a) `foo.f()`
b) `foo.g()`
c) `bar.f()`
d) `bar.g()`

Answer: a, c, d

3. Assuming the following code
```
try {
  f();
  System.out.print("first ");
}
catch(Exception e) {
  System.out.print("second ");
}
finally(Exception e) {
  System.out.print("third")
}
```
Which of the following are true.

a) if `f` throws, output will be 'first second '
b) if `f` throws, output will be 'second third'
b) if `f` doesn't throw output will be 'first third'
d) if `f` doesn't throw output will be 'first'

Answer b, c

4. What are the advantages of return an object representing an error like Result/Either/Try/Option instead of exceptions?

    a. Is more type safe.
    b. Is more composable.
    c. Is more functional.
    d. All of the above

Answer: d


