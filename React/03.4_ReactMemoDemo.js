import { useState, useMemo } from "react";

/*
========================================================
COMPONENT 1 : EXPENSIVE CALCULATION
This component calculates the sum of numbers from: 1 → number.

GOAL:
Show how a heavy calculation runs on EVERY render normally,
but with useMemo it runs ONLY when the dependency changes.

Try this in the UI:
1️⃣ Click "Increase Number"
   → number changes
   → component re-renders
   → BOTH calculations run

2️⃣ Click "Unrelated Re-render"
   → unrelatedCounter changes
   → component re-renders
   → WITHOUT useMemo runs again ❌
   → WITH useMemo does NOT run ✅
========================================================
*/

function ExpensiveCalculation({ number }) {

  console.log("ExpensiveCalculation rendered");
  // This log appears EVERY time the parent component re-renders.


  /*
  ---------------------------------------
  WITHOUT useMemo
  ---------------------------------------

  This calculation runs on EVERY render,
  even if the number did not change.

  Example:
  Clicking "Unrelated Re-render"
  will still run this loop again.
  */

  let resultWithoutMemo = 0;

  for (let i = 1; i <= number; i++) {
    resultWithoutMemo += i;
  }



  /*
  ---------------------------------------
  WITH useMemo
  ---------------------------------------

  useMemo stores (memoizes) the result.

  It ONLY runs again if "number" changes.

  Dependency Array:
  [number]

  Meaning:
  If number stays same → reuse previous result
  If number changes → recalculate
  */

  const resultWithMemo = useMemo(function calculateSum() {

    console.log("useMemo calculation running");

    let sum = 0;
    for (let i = 1; i <= number; i++) {
      sum += i;
    }

    return sum;
  }, [number]);


  return (
    <div>
      <p>Sum WITHOUT useMemo: {resultWithoutMemo}</p>
      <p>Sum WITH useMemo: {resultWithMemo}</p>
    </div>
  );
}



/*
========================================================
COMPONENT 2 : FILTERING A LIST

This component filters a list based on a query.

GOAL:
Avoid running filter logic unnecessarily.

Try this:
1️⃣ Type in the search box
   → query changes
   → filtering runs

2️⃣ Click "Increase Number"
   → App re-renders
   → filtering SHOULD NOT run
   → useMemo prevents unnecessary filtering
========================================================
*/

function FilteredList({ list, query }) {

  console.log("FilteredList component rendered");
  // Runs whenever App re-renders

  /*
  useMemo will only re-run the filter if:
  - list changes
  - query changes

  Otherwise it returns the cached result.
  */

  const filteredList = useMemo(function filterItems() {

    console.log("Filtering list running");

    return list.filter(function(item) {
      return item.toLowerCase().includes(query.toLowerCase());
    });

  }, [list, query]);



  return (
    <ul>
      {filteredList.map(function(item) {
        return <li key={item}>{item}</li>;
      })}
    </ul>
  );
}



/*
========================================================
MAIN APP COMPONENT

Controls state and forces re-renders.

IMPORTANT STATES:

number
→ used in ExpensiveCalculation

unrelatedCounter
→ only used to force re-renders
→ helps demonstrate unnecessary calculations

query
→ used for filtering the fruit list
========================================================
*/

export default function App() {

  console.log("App component rendered");

  const [number, setNumber] = useState(10);

  /*
  This state is NOT used in ExpensiveCalculation logic.
  It only forces a re-render.

  This helps demonstrate:
  Without useMemo → heavy calculation runs again ❌
  With useMemo → heavy calculation skipped ✅
  */

  const [unrelatedCounter, setUnrelatedCounter] = useState(0);

  const fruits = ["Apple","Apricot","Banana","Blueberry","Cherry","Avocado"];

  const [query, setQuery] = useState("a");

  return (
    <div style={{ padding: 30, fontFamily: "monospace" }}>

      <h2>Understanding useMemo</h2>

      <hr />

      <h3>Example 1 : Expensive Calculation</h3>

      <p>Current number: {number}</p>

      {/*
      Button 1:
      Changes the number.

      Result:
      - App re-renders
      - ExpensiveCalculation re-renders
      - useMemo recalculates
      */}

      <button onClick={() => setNumber(n => n + 1)}>
        Increase Number
      </button>


      {/*
      Button 2:
      Only increases unrelatedCounter.

      Result:
      - App re-renders
      - ExpensiveCalculation re-renders
      - BUT useMemo will NOT recompute
      */}

      <button
        onClick={() => setUnrelatedCounter(n => n + 1)}
        style={{ marginLeft: 10 }}
      >
        Unrelated Re-render ({unrelatedCounter})
      </button>

      <ExpensiveCalculation number={number} />

      <hr />


      <h3>Example 2 : Filtering List</h3>

      <p>
        Search:
        {/*
        Typing here updates query.

        Result:
        - App re-renders
        - FilteredList re-renders
        - Filtering runs again
        */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </p>

      <FilteredList list={fruits} query={query} />

    </div>
  );
}
