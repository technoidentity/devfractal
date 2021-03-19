# Pre Interview test 2

1. What is the output of the following program

```
int result = 0;
for(int i = 0; i < 10; ++i) {
  if(i % 2 == 0)
    result += i;
}
System.out.println(result);
```

a) 15
b) 20
c) 25
d) 30

Answer: b

2. How do you get the number of elements in a collection in Java?

a) coll.length()
b) coll.length
c) arr.size()
d) arr.size

Answer: c

3. Is it possible to use Java 5 for loop `for(int e : coll)` with an array too not just collections. True?

Answer: Yes

4. If we need to call `Collections.sort(coll)`, then the collection element type must support Comparable interface. True?

Answer: Yes

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
