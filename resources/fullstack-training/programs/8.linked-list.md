Implement a linked list with following operations

    ```typescript
    type Link<T> = {
      value: T;
      next: Link<T> | undefined;
      prev: Link<T> | undefined;
    };

    export class LinkedList<T> {
      first(): T | undefined;

      last(): T | undefined;

      push(value: T): void;

      pop(): T | undefined;

      unshift(value: T): void;

      shift(): T | undefined;

      insert(before: Link<T>, value: T): void;

      find(value: T): Link<T> | undefined;

      findBy(pred: (value: T) => boolean): Link<T> | undefined;

      remove(at: Link<T>): T | undefined;

      *[Symbol.iterator](): Iterable<T>;

      length();

      static from<T>(iterable: Iterable<T>): LinkedList<T>;
    }
    ```
