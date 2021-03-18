# Pre Interview test 3

1. What is the output of the following program

```
int result = 0;
for(int i = 0; i < 10; ++i) {
  if(i % 2 != 0)
    result += i;
}
System.out.println(result);
```

a) 15
b) 20
c) 25
d) 30

2. We can create an array of ints in Java using

a) new Array<int>(10)
b) new Array<Integer>(10)
c) new int[10]
d) new [10]int

3. If we define `x` with the statement `var x = 100;`, what is the type of x?

a) anything can be assigned to `x`, including string or boolean
b) int
c) Object
d) Var

Answer: b

3. Generally `HashMap::get` is faster than `TreeMap::get`. True?

Answer: True

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

45. Abstract classes cannot define constructors. True?

Answer: False
