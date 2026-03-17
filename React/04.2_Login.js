import { useState, useRef } from "react"


/*
  ==========================================================
  COMPONENT 1 : Login (Controlled Component)
  ==========================================================

  This form uses React state (useState) to control the input value.
  The input value is always synchronized with React state.
*/

export function Login(){

    // State to store the email input value
    const [email,setEmail]= useState("");

    /*
      Console log to observe re-renders.

      In controlled components, every keystroke updates state,
      which triggers a re-render of the component.
    */
    console.log("Render");
    
    /*
      handle runs on form submission.

      e.preventDefault() stops the browser from reloading the page.

      Then we access the latest value from React state.
    */
    function handle(e) {
        e.preventDefault();
        console.log(email);  // Prints the latest email
    }

    return(
        <>
            <form onSubmit={handle}>
                
                {/*
                  Controlled input:

                  value={email} → input value comes from React state
                  onChange → updates state on every keystroke
                */}
                <input
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                {/* Submit button */}
                <input type="submit" />
            </form>
        </>
    )
}



/*
  ==========================================================
  COMPONENT 2 : Login2 (Uncontrolled Component using useRef)
  ==========================================================

  This form does NOT use state to store input value.
  Instead, we use useRef to directly access the DOM element.

  Advantage:
  - Does not trigger re-renders on every keystroke
  - Useful for performance optimization for large forms
*/

export function Login2(){

    /*
      useRef creates a mutable object whose "current" property persists across renders.
      Here we attach it to the <input> to get its value on submit.
    */
    const emailRef= useRef(null);

    console.log("Render"); // Fewer re-renders than useState version

    /*
      handle runs on form submission.

      e.preventDefault() prevents page reload.

      emailRef.current gives access to the DOM node
      and emailRef.current.value gives the current input value.
    */
    function handle(e) {
        e.preventDefault();

        // Prints the current value of the input
        console.log(emailRef.current.value);

        // Prints the ref object itself
        console.log(emailRef);
    }

    return(
        <>
            <form onSubmit={handle}>

                {/*
                  Uncontrolled input:

                  ref={emailRef} attaches the input element
                  to the ref object. No state updates occur on typing.
                */}
                <input type="email" ref={emailRef}/>

                {/* Submit button */}
                <input type="submit" />
            </form>
        </>
    )
}



/*
  ==========================================================
  KEY CONCEPTS DEMONSTRATED IN THIS FILE
  ==========================================================

  1️⃣ Controlled Components (Login)
  -------------------------------
  - Uses useState to store input value
  - Input value is always synced with React state
  - Component re-renders on every keystroke
  - Useful for real-time validation, dynamic UI updates

  2️⃣ Uncontrolled Components (Login2)
  -----------------------------------
  - Uses useRef to directly access DOM elements
  - No re-renders on typing
  - Useful for simple forms or performance optimization
  - State is only needed on submission

  3️⃣ useRef
  ----------
  - Stores mutable object between renders
  - Does NOT trigger re-render when updated
  - Access DOM elements or persist values

  4️⃣ useState
  ------------
  - Stores value in React state
  - Triggers re-render on change
  - Useful when UI depends on input value

  5️⃣ Render behavior
  ------------------
  - Login (controlled): every keystroke → re-render → "Render" logs multiple times
  - Login2 (uncontrolled): re-render only happens if parent component re-renders → "Render" logs fewer times

  ==========================================================
  TIP: For larger forms with validation, it's easier to use
  React Hook Form or a schema validation library like Zod
  instead of manually managing state or refs.
*/
