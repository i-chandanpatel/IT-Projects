// -----------------------------
// Closures
// -----------------------------

/*
Definition:
A closure is created when an inner function remembers and can access
the variables of its outer function even after the outer function
has finished executing.

Formula:
Closure = Function + Lexical Environment
*/


// --------------------------------------------------
// Example: Counter using Closure
// --------------------------------------------------

function createCounter() {

    // Local variable of createCounter()
    let count = 0;

    // Returned function forms a closure over 'count'
    return function () {
        count++;
        console.log("Current Count:", count);
    };
}


// createCounter() executes once
const counter1 = createCounter();

/*
Execution Flow

createCounter()
│
├── count = 0
│
├── creates inner function
│
└── returns inner function
        ↓
counter1 now stores that returned function.

Although createCounter() has finished,
the inner function still remembers 'count'.
*/


counter1(); // Current Count: 1
counter1(); // Current Count: 2
counter1(); // Current Count: 3


// Create another closure
const counter2 = createCounter();

counter2(); // Current Count: 1
counter2(); // Current Count: 2

counter1(); // Current Count: 4


/*
Why doesn't count become 0 again?

Because createCounter() executes ONLY ONCE for counter1.

When it returns the inner function,
JavaScript keeps the variable 'count' alive
instead of destroying it.

Each call to counter1() uses the SAME 'count'.

Each new call to createCounter() creates a NEW closure.

counter1 → count = 4

counter2 → count = 2

Both closures have completely independent memory.
*/