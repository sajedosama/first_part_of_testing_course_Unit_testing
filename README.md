# Unit Testing

This project contains practical exercises and examples developed as part of the **Advanced Application Testing** course, with a focus on **Unit Testing using Jest**.

The project demonstrates how individual functions and modules can be tested in isolation using automated test cases and Jest mocking capabilities.

## Technologies

* JavaScript
* Node.js
* Jest
* npm

## Project Structure

```text
first_part_of_testing_course_Unit_testing/
├── db.js
├── email.js
├── utils.js
├── utils.test.js
├── package.json
├── package-lock.json
└── .gitignore
```

## Testing Concepts

The project covers several important unit testing concepts, including:

* Writing unit tests with Jest
* Testing individual functions
* Mocking external modules
* Mock functions
* `mock.calls`
* `mockReset()`
* Testing function arguments
* Testing function call counts
* Testing asynchronous operations
* Using Jest assertions

## Example Assertions

The tests use Jest assertions such as:

```javascript
expect(db.getUser).toHaveBeenCalledTimes(1);
expect(db.getUser).toHaveBeenCalledWith(5);

expect(email.sendEmail).toHaveBeenCalledTimes(1);
expect(email.sendEmail).toHaveBeenCalledWith(
  'test@gmail.com',
  30
);
```

These assertions verify both the behavior of the functions and how they interact with their dependencies.

## Installation

Clone the repository and install the required dependencies:

```bash
git clone https://github.com/sajedosama/first_part_of_testing_course_Unit_testing.git
cd first_part_of_testing_course_Unit_testing
npm install
```

## Running the Tests

Run the Jest test suite using:

```bash
npm test
```

## Purpose

The main purpose of this project is to practice:

* Unit testing principles
* Test isolation
* Jest mocking
* Test assertions
* Dependency mocking
* Automated software testing

## Course

**Advanced Application Testing**

This project is part of a collection of university projects covering different software testing techniques and tools.
