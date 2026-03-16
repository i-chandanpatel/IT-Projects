import { useEffect, useState } from 'react'


export function Clock1() {

  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // ====================================================================
  // Clock1 - Simple Clock
  // ====================================================================
  // Problem with naive setInterval (without useEffect):
  // - If setInterval is inside the component body, it runs on every render.
  // - After 1 second, setTime updates state → component re-renders.
  // - Each re-render creates a new interval → infinite intervals → memory leaks.
  //
  // Correct approach: useEffect with an empty dependency array []
  // ensures the interval is created only once when the component mounts.
  // ====================================================================

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      console.log("Hi");
    }, 1000);
  }, []);


  return (
    <>
      <h2>Current Time: {time}</h2>
    </>
  )
}




export function Clock2() {

  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [show, setShow] = useState(true);

  // ====================================================================
  // Clock2 - Conditional Clock (Show/Hide)

  // useEffect depends on [show]:
  // - If show is true → start interval
  // - Interval continues running even when component is hidden.
  // - Repeated toggling creates multiple intervals beacause no cleanup 
  //   function is used → memory leaks.
  
  //every time show changes to true, it creates a new interval.
  // - If show becomes false → interval continues running
  //   (demonstrates the problem without cleanup)

  // ====================================================================

  useEffect(() => {

    if (!show) return; // Do nothing if clock is hidden

    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      console.log("Hi");
    }, 1000);
  }, [show]);


  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? "hide" : "show"}
      </button>
      {show && <h2>Current Time: {time}</h2>}
    </>
  )
}


export function Clock3() {

  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [show, setShow] = useState(true);

  // ====================================================================
  // Clock3 - Conditional Clock (Show/Hide) with cleanup

  // useEffect depends on [show]:
  // - If show is true → start interval
  // - If show becomes false →  interval stops
  //
  // This pattern prevents multiple intervals when toggling the clock.
  // The cleanup function ensures no duplicate timers are left running.
  // Cleanup function prevents memory leaks when the component unmounts.
  // ====================================================================

  useEffect(() => {

    if (!show) return; // Do nothing if clock is hidden

    const intervalID = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      console.log("Hi");
    }, 1000);

    // This returned function is CleanUp function
    return () => {
      clearInterval(intervalID);
    }
  }, [show]);


  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? "hide" : "show"}
      </button>
      {show && <h2>Current Time: {time}</h2>}
    </>
  )
}


// ====================================================================
// CLEANUP FUNCTION INSIDE useEffect
// ====================================================================

// ====================================================================
// WHEN DOES CLEANUP RUN?
// ✔ Before the component unmounts
// ✔ Before the effect runs again (if dependencies change)

// ====================================================================
// WHY IS CLEANUP IMPORTANT?
// ❌ Prevent memory leaks
// ❌ Avoid duplicate timers
// ❌ Stop multiple subscriptions
// ❌ Prevent unexpected behavior

// ====================================================================
// REAL EXAMPLES WHERE CLEANUP IS REQUIRED
// ✔ setInterval / setTimeout
// ✔ Event listeners (window, document, DOM elements)
// ✔ WebSocket connections
// ✔ Subscriptions (e.g., API streams, observables)

// RULE: If your effect creates something (timer, listener, subscription),
// always remove it in the cleanup function.
