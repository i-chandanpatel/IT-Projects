import { useState, useMemo } from "react";

/*
========================================================
COMPONENT 1 : EXPENSIVE CALCULATION
========================================================

This component calculates the sum of numbers from
1 → number.

We log two things:
1️⃣ When the component renders
2️⃣ When the useMemo calculation runs
========================================================
*/

function ExpensiveCalculation({ number }) {

  console.log("🔵 ExpensiveCalculation component rendered");

  /*
  WITHOUT useMemo
  This calculation runs every render.
  */

  let resultWithoutMemo = 0;

  for (let i = 1; i <= number; i++) {
    resultWithoutMemo += i;
  }



  /*
  WITH useMemo
  This calculation runs ONLY when number changes.
  */

  const resultWithMemo = useMemo(function calculateSum() {

    console.log("🟢 useMemo calculation running");

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
========================================================

This component filters a list based on a query.

We log:
- when component renders
- when filtering happens
========================================================
*/

function FilteredList({ list, query }) {

  console.log("🟣 FilteredList component rendered");

  const filteredList = useMemo(function filterItems() {

    console.log("🟡 Filtering list running");

    return list.filter(function(item) {

      return item
        .toLowerCase()
        .includes(query.toLowerCase());

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
========================================================

Controls state and forces re-renders.

We log when the App itself renders.
========================================================
*/

export default function App() {

  console.log("🔴 App component rendered");

  const [number, setNumber] = useState(10);

  const [unrelatedCounter, setUnrelatedCounter] = useState(0);

  const fruits = [
    "Apple",
    "Apricot",
    "Banana",
    "Blueberry",
    "Cherry",
    "Avocado"
  ];

  const [query, setQuery] = useState("a");



  return (
    <div style={{ padding: 30, fontFamily: "monospace" }}>

      <h2>Understanding useMemo</h2>

      <hr />


      {/* ===============================
         Example 1 : Expensive Calculation
         =============================== */}

      <h3>Example 1 : Expensive Calculation</h3>

      <p>Current number: {number}</p>

      <button onClick={() => setNumber(n => n + 1)}>
        Increase Number
      </button>

      <button
        onClick={() => setUnrelatedCounter(n => n + 1)}
        style={{ marginLeft: 10 }}
      >
        Unrelated Re-render ({unrelatedCounter})
      </button>


      <ExpensiveCalculation number={number} />



      <hr />


      {/* ===============================
         Example 2 : Filtering List
         =============================== */}

      <h3>Example 2 : Filtering List</h3>

      <p>
        Search:
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </p>

      <FilteredList list={fruits} query={query} />

    </div>
  );
}