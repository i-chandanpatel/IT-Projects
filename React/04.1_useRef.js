import { useRef, useState } from 'react'


/*
  ==========================================================
  APP1 : Demonstrates the "Stale Closure" problem in React
  ==========================================================

  This component tries to implement a simple stopwatch
  using setInterval.

  But it contains a common React issue called a
  "stale closure".

  A stale closure happens when a function remembers
  an old value of state instead of the latest one.
*/

export function App1() {

  // State to store stopwatch time
  const [time, setTime] = useState(0)

  function handleChange(){

    /*
      setInterval runs asynchronously using the Browser Web API.
      It repeatedly runs the callback every 1000 ms (1 second).
    */
    setInterval(()=>{

      /*
        ❗ IMPORTANT REACT BEHAVIOR

        When handleChange runs the FIRST time,
        the value of "time" inside this function is 0.

        JavaScript closures remember variables from the moment the function was created.

        So this interval callback remembers:time = 0


        Every second React executes:

        setTime(time + 1)

        But "time" inside this closure is always 0.

        So the interval keeps calling:

        setTime(0 + 1)


        First execution:
        time becomes 1 → component re-renders

        
        After re-render:

        The interval STILL remembers the old value (0) because the closure was created earlier.

        So it keeps doing: setTime(1)

        React ignores state updates when the value does not change.
        So after the first update, the UI stops updating.
      */

      setTime(time+1);

      console.log("hi from App1");

    },1000)
  }

  return (
    <>
      <h1>Stopwatch {time}</h1>

      <div>
        <button onClick={handleChange}>Start</button>
        <button>Pause</button>
        <button>Reset</button>
      </div>
    </>
  )
}



/*
  ==========================================================
  APP2 : Correct Implementation of Stopwatch
  ==========================================================

  This version fixes two problems:

  1️⃣ Stale state problem
  2️⃣ Interval reference management

  It uses:

  - Functional state update
  - useRef to store interval ID
*/

export function App2() {

  // State to store stopwatch time
  const [time, setTime] = useState(0)

  /*
    useRef creates a mutable object that persists across component re-renders.

    Structure:
    {
      current: value
    }

    Unlike useState:
    - updating useRef DOES NOT trigger re-render
    - the value stays the same between renders

    Here we store the interval ID so we can stop it later.
  */
  let intervalID=useRef(null);


  function handleChange(){

    /*
      Prevent multiple intervals from being created.
      If the stopwatch is already running, do nothing.
    */
    if(intervalID.current!=null) return;

    
    // Start the interval and store the ID inside the ref.
    intervalID.current=setInterval(()=>{

      /*
        Functional state update.

        Instead of using:
        setTime(time + 1)

        we use:

        setTime(prev => prev + 1)

        React provides the latest state value as "prev", avoiding stale closure issues.
      */
      setTime(time=>time+1);

      console.log("hi");

    },1000)
  }


  function pause(){

    // clearInterval stops the timer using the ID stored in intervalID.current
    clearInterval(intervalID.current);

    // Reset the ref so that the timer can be started again later.
    intervalID.current=null;
  }


  return (
    <>
      <h1>Stopwatch {time}</h1>

      <div>
        <button onClick={handleChange}>Start</button>
        <button onClick={pause}>Pause</button>
        <button>Reset</button>
      </div>
    </>
  )
}



/*
  ==========================================================
  KEY CONCEPTS DEMONSTRATED IN THIS FILE
  ==========================================================


  1️⃣ Stale Closure

  Happens when a function remembers an old state value.

  Example problem:

  setInterval(() => {
      setTime(time + 1)
  },1000)

  The interval remembers the initial "time" instead of the updated value.


  ----------------------------------------------------------


  2️⃣ Functional State Update

  Correct solution:

  setTime(prev => prev + 1)

  React guarantees "prev" is always the latest state.


  ----------------------------------------------------------


  3️⃣ useRef

  useRef stores values that persist between renders
  WITHOUT triggering re-renders.

  Common use cases:

  - Storing interval IDs
  - Accessing DOM elements
  - Persisting mutable values
  - Avoiding re-renders


  ----------------------------------------------------------


  4️⃣ Why not use a normal variable?

  Example:

  let intervalID = null

  Problem:
  When the component re-renders,
  the variable resets.

  But useRef persists across renders.


  ----------------------------------------------------------


  5️⃣ Typical real-world use cases

  - Stopwatch / timer
  - Polling APIs
  - Debouncing inputs
  - Animations
  - Managing WebSocket intervals
*/
