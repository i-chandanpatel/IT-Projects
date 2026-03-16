import { useState, useCallback } from "react";

/*
========================================================
MAIN IDEA OF useCallback

IMPORTANT CONCEPT:

In JavaScript, every time a component renders,
any function defined inside it is recreated.

Example:

function handleClick(){}

Every render creates a NEW function in memory.

Why this can be a problem:
- Passing functions to child components
- Preventing unnecessary re-renders
- Maintaining stable function references

useCallback solves this.

useCallback returns a MEMOIZED function.
React will reuse the SAME function reference
until the dependencies change.

Syntax:

const memoizedFunction = useCallback(fn, dependencies)

========================================================
*/

export default function App() {

  console.log("App component rendered");
  /*
  This log helps you see when React re-renders the component.

  Try clicking any button and watch the console.
  */

  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);



  /*
  ========================================================
  PROBLEM EXAMPLE — EMPTY DEPENDENCY ARRAY
  ========================================================

  This callback uses "count" BUT the dependency array is [].

  That means:
  - React creates this function ONLY once
  - The function remembers the value of count
    from the FIRST render.

  This creates something called a "STALE CLOSURE".

  Meaning:
  The function holds an OLD value of count forever.

  Steps to test:

  1️⃣ Click "Increment Count" several times
      count becomes 1, 2, 3, etc.

  2️⃣ Click "Alert count (stale)"

  Result:
  It will still show the ORIGINAL value (0).

  Because the function never updated.
  */

  const handleWithEmptyDeps = useCallback(() => {

    console.log("handleWithEmptyDeps executed");

    alert("Count seen by this function: " + count);

  }, []); // ← function created only once during first render



  /*
  ========================================================
  CORRECT EXAMPLE — COUNT IN DEPENDENCY ARRAY
  ========================================================

  Now "count" is included in the dependency array.

  This means:
  Whenever count changes → React creates a NEW function.

  That function now captures the LATEST value of count.

  Steps to test:

  1️⃣ Click "Increment Count" a few times
      count becomes 1,2,3...

  2️⃣ Click "Alert count (correct)"

  Result:
  It shows the latest count.

  Because React recreated the function
  when count changed.
  */

  const handleWithCorrectDeps = useCallback(() => {

    console.log("handleWithCorrectDeps executed");

    alert("Count seen by this function: " + count);

  }, [count]);



  /*
  ========================================================
  COMPONENT UI
  ========================================================

  Buttons below trigger different state changes.

  React re-renders the component whenever
  ANY state changes.
  */

  return (
    <div style={{ padding: 30, fontFamily: "monospace" }}>

      <h2>Understanding useCallback</h2>

      <p>Count state: {count}</p>
      <p>Other state: {other}</p>


      {/* ------------------------------------------------
         BUTTON 1 — CHANGE COUNT
      ------------------------------------------------

      This updates the "count" state.

      Result:
      - App component re-renders
      - handleWithCorrectDeps is recreated
      - handleWithEmptyDeps stays the same
      */}

      <button onClick={() => setCount(c => c + 1)}>
        Increment Count
      </button>


      {/* ------------------------------------------------
         BUTTON 2 — CHANGE OTHER STATE
      ------------------------------------------------

      This changes "other".

      Important:
      count DOES NOT change.

      Result:
      - App component re-renders
      - handleWithCorrectDeps stays the same
      - handleWithEmptyDeps stays the same
      */}

      <button
        onClick={() => setOther(o => o + 1)}
        style={{ marginLeft: 10 }}
      >
        Change Other State
      </button>


      <hr />


      {/* -----------------------------------------
         Stale closure example
      -----------------------------------------

      This demonstrates what happens when
      dependencies are incorrect.

      Because the dependency array is empty,
      the function never updates.

      It always remembers count from the FIRST render.
      */}

      <h3>Stale closure example</h3>

      <p>
        This callback has an empty dependency array.
        It captures count from the FIRST render.
      </p>

      <button onClick={handleWithEmptyDeps}>
        Alert count (stale)
      </button>



      <hr />


      {/* -----------------------------------------
         Correct dependency example
      -----------------------------------------

      This demonstrates the correct way.

      Because count is in the dependency array,
      the function updates whenever count changes.

      It always has the latest value.
      */}

      <h3>Correct dependency example</h3>

      <p>
        This callback lists count as dependency.
        It always sees the latest value.
      </p>

      <button onClick={handleWithCorrectDeps}>
        Alert count (correct)
      </button>

    </div>
  );
}
