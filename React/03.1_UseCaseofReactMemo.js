/*
===========================================================
DEMONSTRATION: UNNECESSARY RENDERING WITHOUT React.memo
===========================================================

Key Idea:
When a parent component re-renders,
ALL child components re-render.

Even if the child component props
did NOT change.

In this file we will show that problem.

Structure:
ParentComponent
   ├── IncrementComponent
   └── RandomCalculationComponent

IncrementComponent changes state.
RandomCalculationComponent does heavy work.

But notice something strange:
Whenever IncrementComponent updates state,
RandomCalculationComponent will also render.

WHY?

Because React re-renders the parent component.
And when parent renders, all children render again.
===========================================================
*/

import { useState } from "react";


/*
===========================================================
Increment Component
===========================================================

This component manages its own state.

When button is clicked:
count increases
component re-renders

BUT because the parent also re-renders,
the RandomCalculationComponent also renders.

Even though it does NOT depend on count.

We will observe this using console.log.
===========================================================
*/

function IncrementComponent() {

  const [count, setCount] = useState(0);

  console.log("IncrementComponent Rendered");

  return (
    <div style={{border:"2px solid blue",padding:"10px",margin:"10px"}}>
      <h2>Increment Component</h2>

      <p>Count: {count}</p>

      <button onClick={()=>setCount(count+1)}>
        Increment
      </button>
    </div>
  );
}


/*
===========================================================
Random Calculation Component
===========================================================

This component performs a heavy calculation.

Important:
It receives a STATIC prop.

Meaning:
The prop NEVER changes.

But even then this component will re-render
whenever the parent re-renders.

So each time you click increment,
this heavy calculation runs again.

This is unnecessary work.
===========================================================
*/

function RandomCalculationComponent({value}) {

  console.log("RandomCalculationComponent Rendered");

  // heavy calculation simulation
  let total = 0;

  for(let i=0;i<100000000;i++){
    total += i;
  }

  return (
    <div style={{border:"2px solid red",padding:"10px",margin:"10px"}}>
      <h2>Random Calculation Component</h2>
      <p>Static Prop Value: {value}</p>
      <p>Heavy Calculation Result: {total}</p>
    </div>
  );
}


/*
===========================================================
Parent Component
===========================================================

Parent renders both components.

Whenever IncrementComponent updates state,
Parent re-renders.

When Parent re-renders,
ALL children render again.

Observe the console:

Click increment button.

Console output:
IncrementComponent Rendered
RandomCalculationComponent Rendered

Even though the Random component
does not depend on count.
===========================================================
*/

export default function WithoutMemo(){

  console.log("Parent Component Rendered");

  return (
    <div>
      <h1>WITHOUT React.memo Example</h1>

      <IncrementComponent />

      {/* static prop value */}
      <RandomCalculationComponent value={10}/>
    </div>
  );
}