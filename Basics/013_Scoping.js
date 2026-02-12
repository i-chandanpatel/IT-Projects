// Global scope
let a = 12;

function abcd() {
    // JS looks for `a` where this function is DEFINED
    // Step 1: Is `a` inside abcd()? ❌
    // Step 2: Go to parent (global scope) ✅
    // a = 12 found here
    console.log(a); // 👉 prints 12
}

function defg() {
    // This `a` exists ONLY inside defg()
    // It does NOT affect abcd()
    let a = 13;

    // abcd() does NOT use this `a`
    // because JS is lexically scoped
    // (definition location matters, not call location)
    abcd();
}

// Function call starts here
defg();


// (If JS were Dynamically Scoped language )

// let b = 12;

// function abcd() {
//     console.log(a);
// }

// function defg() {
//     let b = 13;
//     abcd(); // dynamic scope would pick a = 13
// }

// defg();
