/*
===========================================================
OPTIMIZED VERSION USING React.memo
===========================================================

React.memo prevents unnecessary re-rendering.

Mechanism:

When parent renders:
React compares previous props vs new props.

If props are SAME:
React skips rendering the component.

If props changed:
Component renders again.

In this file we demonstrate TWO cases.

CASE 1:
Static prop → component will NOT re-render.

CASE 2:
Dynamic prop → component WILL re-render.
===========================================================
*/

import { useState, memo } from "react";


/*
===========================================================
Increment Component
===========================================================
Same as before.

Changing count will re-render parent.
===========================================================
*/

function IncrementComponent(){

  const [count,setCount] = useState(0);

  console.log("IncrementComponent Rendered");

  return(
    <div style={{border:"2px solid green",padding:"10px",margin:"10px"}}>

      <h2>Increment Component</h2>

      <p>Count: {count}</p>

      <button onClick={()=>setCount(count+1)}>
        Increment
      </button>

    </div>
  )
}


/*
===========================================================
Random Calculation Component
===========================================================

This component is wrapped with React.memo.

React will compare props before rendering.

If props unchanged → skip rendering.

If props changed → render again.
===========================================================
*/

const RandomCalculationComponent = memo(function RandomCalculationComponent({value}){

  console.log("RandomCalculationComponent Rendered");

  let total = 0;

  for(let i=0;i<100000000;i++){
    total += i;
  }

  return(
    <div style={{border:"2px solid orange",padding:"10px",margin:"10px"}}>
      <h2>Random Calculation Component</h2>

      <p>Prop Value: {value}</p>

      <p>Heavy Calculation Result: {total}</p>
    </div>
  )

});


/*
===========================================================
Parent Component
===========================================================

Here we show TWO examples.

Example 1 → Static prop
Example 2 → Dynamic prop

-----------------------------------------------------------
Example 1 (Static Prop)
-----------------------------------------------------------

value = 10

Even if parent renders,
React.memo will skip rendering
RandomCalculationComponent.

Console:
Parent Rendered
IncrementComponent Rendered

But RandomCalculationComponent
WILL NOT render again.

-----------------------------------------------------------
Example 2 (Dynamic Prop)
-----------------------------------------------------------

value changes with state.

So React.memo detects prop change.

Then component renders again.
===========================================================
*/

export default function WithMemo(){

  const [number,setNumber] = useState(1);

  console.log("Parent Component Rendered");

  return(
    <div>

      <h1>WITH React.memo Example</h1>

      <IncrementComponent/>

      <button onClick={()=>setNumber(number+1)}>
        Change Prop Value
      </button>

      {/* dynamic prop */}
      <RandomCalculationComponent value={number}/>

    </div>
  )

}