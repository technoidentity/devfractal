1. After the execution of the statement `Integer[] arr = new Integer[10];`, what is the value of arr[0]?

a) new Integer()
b) null
c) 0
d) none of the above

Answer: b

2. Expressions in Java

a) always produce a value
b) almost always produce a value
c) never produce a value
d) depends on the program

Answer: a

3. Which of the following is true

a) ArrayList::get is faster than LinkedList::get
b) LinkedList::get is faster than ArrayList::get
c) LinkedList::get and ArrayList::get both fast
d) It depends on the values they contain

Answer: a

4. java 5 for loop(also sometimes called foreach) can be used with

a) collections
b) arrays and collections
c) arrays and iterables
d) file readers, arrays and iterables

Answer: c

5. Assuming the following code
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
