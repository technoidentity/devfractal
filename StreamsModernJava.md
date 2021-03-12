
## Streams

1. **In Java, Stream is a**
   a. collection of characters from an I/O device
   b. sequence of elements from a source that supports data-processing operations
   c. sequence of elements from a collection
   d. collection of items from a database

   >answer : b

2. **Using streams, you can write code that specifies:**
   a. what operation needs to be done
   b. how to implement the required operation
   c. both a and b
   d. none

   >answer : a

3. **The elements of a stream coming from a list will have**
   a. the same order as the list.
   b. the random order
   c. ascending order
   d. descending order

   >answer : a

4. **In a stream, values are**
  a. calculated as they are needed, on demand
  b. precomputed

    >answer ; a

5. **A stream can be traversed**
   a. only once
   b. twice
   c. any number of times
   d. odd number of times

   >answer : a

6. **Stream makes use of**
   a. internal iteration, where the library takes care of the iteration
   b. external iteration, where iteration needs to be done by the user
   c. both internal and external iteration
   d. Iterator

   >answer  : a

7. **How can you write the following code using streams:**

       List<String> highCaloricDishes = new ArrayList<>();
       Iterator<String> iterator = menu.iterator();
       while(iterator.hasNext()) {
          Dish dish = iterator.next();
          if(dish.getCalories() > 300) {
            highCaloricDishes.add(d.getName());
          }
       }

        a. List<String> highCaloricDish = menu.stream()
              .map(dish -> dish.getCalories() > 300)
              .collect(toList());
        b. List<String> highCaloricDish = menu.stream()
              .filter(dish -> dish.getCalories() > 300)
              .sort(toList());
        c. List<String> highCaloricDish = menu.stream()
              .filter(dish -> dish.getCalories() > 300)
              .collect(toList());
        d. List<String> highCaloricDish = menu.stream()
              .map(dish -> dish.getCalories() > 300)
              .groupBy(toList());

    >answer : c

  8. **Intermediate stream operations**
      a. return another stream as the return type.
      b. don’t perform any processing until a terminal operation is invoked on the stream pipeline—they’re lazy.
      c. can usually be merged and processed into a single pass by the terminal operation.
      d. all of the above

     > answer : d

  9. **In the following stream pipeline, the intermediate operations are**

          long count = menu.stream()
                        .filter(dish -> dish.getCalories() > 300)
                        .distinct()
                        .limit(3)
                        .count();


           a. stream(), filter(), distinct(), limit(), count()
           b. filter(), distinct(), limit(), count()
           c. filter(), distinct(), limit()
           d. stream(), count()

      >answer : c

  10. **A terminal stream operation**
      a. returns another stream
      b. executes the stream pipeline and produces a non stream result
      c. displays the stream elements
      d. closes the stream

      >answer : b


