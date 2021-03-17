1. Generally `HashMap::get` is faster than `TreeMap::get`. True?

Answer: True

2. In Java, is it possible to allocate objects on the stack?

Answer: No

3. Assuming `createArray` is implemented the following way

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

4. Assuming the following code

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

Select all the statements that are legal

a) `foo.f()`
b) `foo.g()`
c) `bar.f()`
d) `bar.g()`

Answer: a, c, d

5. Which of the following is true

a) ArrayList::get is faster than LinkedList::get
b) LinkedList::get is faster than ArrayList::get
c) LinkedList::get and ArrayList::get both fast
d) It depends on the values they contain

Answer: a
