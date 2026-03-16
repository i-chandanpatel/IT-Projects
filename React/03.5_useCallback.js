import { useState, useCallback } from "react";

/*
========================================================
MAIN IDEA OF useCallback
========================================================

In JavaScript, every time a component renders,
any function defined inside it is recreated.

Example:

function handleClick(){}

This function is created again on every render.

useCallback stores the function reference and
returns the SAME function unless dependencies change.
========================================================
*/

export default function App() {

  console.log("🔴 App component rendered");

  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);



  /*
  ========================================================
  PROBLEM EXAMPLE — EMPTY DEPENDENCY ARRAY
  ========================================================

  This callback uses "count" but the dependency array is [].

  That means React creates the function only once.

  The function captures count from the FIRST render.

  This creates a STALE CLOSURE.
  */

  const handleWithEmptyDeps = useCallback(() => {

    console.log("🟡 handleWithEmptyDeps executed");

    alert("Count seen by this function: " + count);

  }, []); // ← created once only



  /*
  ========================================================
  CORRECT EXAMPLE — COUNT IN DEPENDENCY ARRAY
  ========================================================

  Now count is included in dependencies.

  React recreates the function whenever
  count changes.

  The function now always sees the latest count.
  */

  const handleWithCorrectDeps = useCallback(() => {

    console.log("🟢 handleWithCorrectDeps executed");

    alert("Count seen by this function: " + count);

  }, [count]);



  /*
  ========================================================
  COMPONENT UI
  ========================================================
  */

  return (
    <div style={{ padding: 30, fontFamily: "monospace" }}>

      <h2>Understanding useCallback</h2>

      <p>Count state: {count}</p>
      <p>Other state: {other}</p>

      {/* Change count */}
      <button onClick={() => setCount(c => c + 1)}>
        Increment Count
      </button>

      {/* Trigger re-render without touching count */}
      <button
        onClick={() => setOther(o => o + 1)}
        style={{ marginLeft: 10 }}
      >
        Change Other State
      </button>


      <hr />


      {/* -----------------------------------------
         Stale closure example
      ----------------------------------------- */}

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
      ----------------------------------------- */}

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