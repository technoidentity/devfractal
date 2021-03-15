1. After the execution of following statements
```
Point pt = new Point(1, 2);
Point pt2 = pt;
pt.setX(100);
```
What will be the value of `pt2.getX()`?

a) 0
b) 1
c) 100
d) none of the above

Answer: c

2. Java has

a) pass by value only
b) pass by reference only
c) both pass by value and pass by reference
d) pass by value for primitive types and pass by reference for object types

Answer: a

3. Which of the following is true

a) A generic class has only one class definition
b) a separate class is generated for each parameterized object
c) a separate class is generated for each primitive but shares the same class for all Objects.
d) All the code is inlined and no class is generated.

Answer: a

4. If an interface inherits two or more constants with the same name

```
public interface X {
  int val=1;
}
public interface Y {
  int val=2;
}
public interface Z extends X,Y {
}
```

What happens if we reference Z.val

a) it refers to X.val
b) it refers to Y.val
c) compiler error because of ambiguity
d) it refers to X.val + Y.val

Answer: c

5. **A terminal stream operation**

a) returns another stream
b) executes the stream pipeline and produces a non stream result
c) displays the stream elements
d) closes the stream

Answer: b
