1. Is it possible to use Java 5 for loop `for(int e : coll)` with an array too not just collections. True?

Answer: Yes

2. If we need to call `Collections.sort(coll)`, then the collection element type must support Comparable interface. True?

Answer: Yes

3. After the execution of following statements

```
Point first = new Point(1, 2);
Point second = first;
first.setX(100);
```

What will be the value of `second.getX()`?

a) 0
b) 1
c) 100
d) none of the above

Answer: c

4. Calling the following function CANNOT throw `NullPointerException`. True?

```
public static int foo(Integer arg) {
  int x = arg;
  return x;
}
```

Answer: False

5. Assuming the following code

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
c) if `f` doesn't throw output will be 'first third'
d) if `f` doesn't throw output will be 'first'

Answer b, c
