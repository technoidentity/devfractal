# Pre Interview test 1

1. For the following code `ArrayList::add(e)` method

a) adds the value to the end of the list
b) adds the value to the beginning of the list
c) at the most appropriate position, based on performance
d) ArrayList doesn't have `add` method

2. It's okay to store mutable objects(for eg. objects with setter methods) as keys in Hashmap. True?

Answer: False

3. Array `length` is fixed. Once array is created it's length cannot be changed. True?

Answer: Yes

4. Assuming the following code

```
public static void foo(Point pt) {
  pt.setX(100);
}

```

Code below produces the output

```
Point pt = new Point(1, 2);
Point other = pt;
pt.setX(10);
foo(pt);
System.out.print(other.getX());
```

a) 1
b) 10
c) 100
d) null

Answer: c

5. The following code fragment is illegal,you cannot assign `int` to `Object`. True?

```
int x = 10;
Object o = x;
```

Answer: False
