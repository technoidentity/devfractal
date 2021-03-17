1. If you need to store values in a Hashmap, these values must support Comparable interface. True?

Answer: False

2. Lambda expression in Java, can only access final and effective final variables from the outer method. True?

Answer: True

3. `finally` block is always called, even when exception is not thrown. True?

Answer: True

4. Abstract classes cannot define constructors. True?

Answer: False

5. Assuming `swap` is implemented the following way.

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
