<center>

  <h1>FHF-LinkedList</h1>
  <img src="logo.png">

</center>

## Overview

The `fhf-linkedlist` library provides a powerful and efficient implementation of a linked list using WebAssembly for performance-critical operations.

## Table of Contents

1. [Installation](#installation)
2. [Getting Started](#getting-started)
3. [Class: `LinkedList`](#class-linkedlist)
   - [Methods](#methods)
     - [`append(data)`](#appenddata)
     - [`push(data)`](#pushdata)
     - [`display()`](#display)
     - [`length()`](#length)
     - [`reverse()`](#reverse)
     - [`freeList()`](#freelist)
     - [`get(index)`](#getindex)
     - [`deleteNode(index)`](#deletenodeindex)
     - [`insert(index, data)`](#insertindex-data)
4. [Memory Management](#memory-management)
5. [WebAssembly Integration](#webassembly-integration)
6. [Examples](#examples)

## Installation

To install the `fhf-linkedlist` library, use npm:

```bash
npm install fhf-linkedlist
```

## Getting Started

Here's a quick example to get you started with `fhf-linkedlist`:

```js
import LinkedList from "fhf-linkedlist";
(async () => {
	const list = new LinkedList([1, 2, 3]);
	await list.append(4);
	list.display(); // Outputs: 1 -> 2 -> 3 -> 4
})();
```

## Class: LinkedList

### Methods

#### `append(data)`

Adds a new element to the end of the list.

- **Parameters:**

  - `data`: The data to append.

- **Usage:**
  ```javascript
  await list.append(5);
  ```

#### `push(data)`

Adds a new element to the beginning of the list.

- **Parameters:**

  - `data`: The data to push.

- **Usage:**

  ```javascript
  await list.push(0);
  ```

#### `display()`

Displays the elements of the list.

- **Usage:**

  ```javascript
  list.display();
  ```

#### `length()`

Returns the number of elements in the list.

- **Returns:**

  - `Number`: The length of the list.

- **Usage:**

  ```javascript
  const len = await list.length();
  console.log(len); // Outputs: 4
  ```

#### `reverse()`

Reverses the list.

- **Usage:**

  ```javascript
  await list.reverse();
  ```

#### `freeList()`

Frees the memory allocated for the list.

- **Usage:**

  ```javascript
  await list.freeList();
  ```

#### `get(index)`

Gets the value at the specified index.

- **Parameters:**

  - `index`: The index of the element to retrieve.

- **Returns:**

  - `Any`: The value at the specified index.

- **Usage:**

  ```javascript
  const value = await list.get(2);
  console.log(value); // Outputs: 3
  ```

#### `deleteNode(index)`

Deletes the node at the specified index.

- **Parameters:**

  - `index`: The index of the node to delete.

- **Usage:**

  ```javascript
  await list.deleteNode(1);
  ```

#### `insert(index, data)`

Inserts a new element at the specified index.

- **Parameters:**

  - `index`: The index at which to insert the new element.
  - `data`: The data to insert.

- **Usage:**

  ```javascript
  await list.insert(1, 10);
  ```

## Memory Management

The linked list utilizes WebAssembly memory for efficient allocation and manipulation. The memory is configured with an initial size and a maximum size to handle the linked list operations.

## WebAssembly Integration

The library uses WebAssembly to perform core linked list operations such as appending, pushing, deleting, and reversing nodes. The `main.wasm` file is loaded and instantiated, providing access to the exported functions used within the `LinkedList` class.

## Examples

### Creating and Displaying a Linked List

```javascript
import LinkedList from "fhf-linkedlist";

(async () => {
	const list = new LinkedList([1, 2, 3]);
	list.display(); // Outputs: 1 -> 2 -> 3
})();
```

### Appending and Pushing Data

```javascript
import LinkedList from "fhf-linkedlist";

(async () => {
	const list = new LinkedList([1, 2, 3]);
	await list.append(4);
	await list.push(0);
	list.display(); // Outputs: 0 -> 1 -> 2 -> 3 -> 4
})();
```

### Reversing the List

```javascript
import LinkedList from "fhf-linkedlist";

(async () => {
	const list = new LinkedList([1, 2, 3]);
	await list.reverse();
	list.display(); // Outputs: 3 -> 2 -> 1
})();
```

### Getting Length of the List

```javascript
import LinkedList from "fhf-linkedlist";

(async () => {
	const list = new LinkedList([1, 2, 3, 4, 5]);
	const length = await list.length();
	console.log(length); // Outputs: 5
})();
```

### Freeing the List

```javascript
import LinkedList from "fhf-linkedlist";

(async () => {
	const list = new LinkedList([1, 2, 3, 4, 5]);
	await list.freeList();
	list.display(); // Outputs nothing, as the list is now empty
})();
```

## Conclusion

The `fhf-linkedlist` library offers a high-performance linked list implementation with the power of WebAssembly. This documentation provides a comprehensive guide to using the library, focusing on the `index.js` file. For further assistance, refer to the additional examples and method descriptions provided.
