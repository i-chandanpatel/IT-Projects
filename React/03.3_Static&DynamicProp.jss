import { useState, memo, useMemo } from "react";

/*
=========================================================
HELPER FUNCTION: Tells which components re-render when the counter changes.
*/

const log = (name) => {
  console.log(`${name} rendered`);
};



/*
=========================================================
STATIC CHILD COMPONENT

Receives a STATIC prop (limit = 100).

Two optimizations are used here:

1️⃣ React.memo
Prevents the component from re-rendering if the prop value has not changed.

2️⃣ useMemo
Caches the expensive calculation.

Since the prop never changes, the calculation runs only once.
=========================================================
*/

const StaticChild = memo(function StaticChild({ limit }) {
  log("StaticChild");

  const sum = useMemo(() => {
    console.log("StaticChild calculation running");

    let total = 0;
    for (let i = 1; i <= limit; i++) {
      total += i;
    }
    return total;
  }, [limit]); // limit = 100 always → calculation never repeats

  return (
    <div>
      <h3>Static Child</h3>
      <p>Sum 1 → {limit}</p>
      <p>Result: {sum}</p>
    </div>
  );
});



/*
=========================================================
DYNAMIC CHILD COMPONENT

Receives a DYNAMIC prop (counter value).

Behavior:

React.memo
Allows re-render when the prop changes.

useMemo
Recomputes the sum only when the prop changes.

=========================================================
*/

const DynamicChild = memo(function DynamicChild({ limit }) {

  log("DynamicChild");

  const sum = useMemo(() => {
    console.log("DynamicChild calculation running");

    let total = 0;
    for (let i = 1; i <= limit; i++) {
      total += i;
    }
    return total;
  }, [limit]); // recalculates when limit changes

  return (
    <div>
      <h3>Dynamic Child</h3>
      <p>Sum 1 → {limit}</p>
      <p>Result: {sum}</p>
    </div>
  );
});



/*
=========================================================
PARENT COMPONENT

Controls a counter.

This counter is passed to DynamicChild.

=========================================================
*/

export default function App() {
  log("App");
  const [count, setCount] = useState(1);

  return (
    <div>
      <h1>React.memo + useMemo Example</h1>

      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>

      <hr />
      <StaticChild limit={100} />
      <hr />
      <DynamicChild limit={count} />

    </div>
  );
}
