function outer() {

    // `count` is a LOCAL variable of `outer`
    // Normally, local variables are destroyed
    // once the function finishes execution
    let count = 0;

    function inner() {
        // `inner` does NOT have its own `count`
        // JS looks for `count` in:
        // 1) inner's local scope ❌
        // 2) outer's scope (lexical parent) ✅
        // Because of CLOSURE, `count` is still alive
        count++;

        // Logs the UPDATED value of the SAME `count`
        console.log(count);
    }

    // We RETURN the inner function itself (not calling it)
    // This allows `inner` to be used AFTER `outer` is finished
    return inner;
}

// Calling outer()
// - `outer()` runs once
// - `count` is created and set to 0
// - `inner` is returned
// - `outer()` execution is now COMPLETE
let counter = outer();

// Even though `outer()` is done,
// `count` is NOT destroyed
// because `inner` still references it
// This preserved memory is called a CLOSURE

counter(); // count = 1
// inner() → finds `count` via closure → increments → logs 1

counter(); // count = 2
// SAME `count` variable is reused (not reset)

counter(); // count = 3
// `count` continues from previous value
