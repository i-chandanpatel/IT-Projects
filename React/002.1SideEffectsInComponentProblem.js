import { useState } from "react";

function App1(){
  const [users,setUsers] = useState([]);
  
  async function GitHubProfile() {
    const response = await fetch("https://api.github.com/users");
    const data = await response.json();
    setUsers(data);
  }

  GitHubProfile();  // ❌ Called directly inside component (during render phase)

  return (
  <>
    <h3>Github Users</h3>
    <div style={{display:"flex", justifyContent:"center", alignItem:"center", flexWrap:"wrap", gap:"10px"}}>
      {
        users.map(user=>(
          <img key={user.login} src={user.avatar_url} height={"100px"} width={"100px"} />
        ))
      }
    </div>
  </> )
}


/*
====================================================================
🚨 PROBLEM: Calling API directly inside the component body
====================================================================

React components are pure functions of state and props.

That means:
Component runs → returns JSX → done.

But here we are doing something extra:
We are performing a SIDE EFFECT during rendering.

What is a side effect?
Anything that:
- Fetches data
- Updates state
- Uses timers
- Talks to external systems

These must NOT run during render.

--------------------------------------------------------------------

🔥 What actually happens step-by-step:

1️⃣ Component renders for the first time
2️⃣ GitHubProfile() runs immediately
3️⃣ setUsers(data) updates state
4️⃣ State update triggers re-render
5️⃣ Component runs again
6️⃣ GitHubProfile() runs again
7️⃣ setUsers() runs again
8️⃣ Loop continues...

This creates:
❌ Continuous API calls
❌ Performance issues
❌ Possible browser crash
❌ API rate limiting from GitHub

--------------------------------------------------------------------

🧠 Important Concept:

Render Phase = Calculation of UI  
It should be PURE (no side effects)

If state is updated during render,
React will re-run the component again.

React is not broken here.
It is doing exactly what it is designed to do.

We created a feedback loop ourselves.

--------------------------------------------------------------------

⚠️ Core Rule:

Never call state-updating functions
directly inside the component body.

Side effects must be separated
from rendering logic.

This is why useEffect exists.
It allows us to run side effects
AFTER rendering — not DURING rendering.

====================================================================
In the next file we will move this logic
into useEffect and solve the problem properly.
====================================================================
*/































====================================================================
5️⃣ WHY StrictMode SOMETIMES CALLS useEffect TWICE

In React 18+ You may notice:
✔ useEffect runs twice in development
✔ API gets called twice
✔ Console logs appear twice

This usually happens because of: <React.StrictMode>

WHAT IS StrictMode?
It is a development tool that helps detect unsafe side effects.
It intentionally runs certain lifecycle logic twice ONLY in development mode.

WHY DOES IT RUN useEffect TWICE?
  React simulates:  Mount → Unmount → Mount again

This helps detect:
✔ Side effects that are not cleaned properly
✔ Memory leaks
✔ Unsafe state updates

IMPORTANT:
✔ This happens ONLY in development
✔ It does NOT happen in production build
✔ Your production app runs normally


====================================================================
HOW useEffect CAN CAUSE INFINITE LOOPS

useEffect(() => {
  setCount(count + 1);
}, [count]);

WHAT HAPPENS?
1. count changes
2. useEffect runs
3. setCount updates count
4. count changes again
5. useEffect runs again
6. Infinite loop

WHY DOES THIS HAPPEN?
Because the effect updates the same state that is in dependency array.

HOW TO FIX?
✔ Make sure effect does not continuously update its own dependency
✔ Use conditional logic if needed

useEffect(() => {
  if (count < 5) {
    setCount(prev => prev + 1);
  }
}, [count]);

*/





/*
====================================================================
6️⃣ CLEANUP FUNCTION INSIDE useEffect
====================================================================

useEffect can return a function.

Example:
useEffect(() => {
  const interval = setInterval(() => {
    console.log("Running...");
  }, 1000);
  
  return () => {
    clearInterval(interval);
  };
}, []);


WHAT IS THIS RETURN FUNCTION?
It is called Cleanup Function

WHEN DOES CLEANUP RUN?
✔ Before component unmounts
✔ Before effect runs again (if dependencies change)

WHY IS CLEANUP IMPORTANT?

To prevent:
❌ Memory leaks
❌ Duplicate timers
❌ Multiple subscriptions
❌ Unexpected behavior


REAL EXAMPLES WHERE CLEANUP IS REQUIRED:

✔ setInterval / setTimeout
✔ Event listeners
✔ WebSocket connections
✔ Subscriptions

RULE: If your effect creates something, cleanup should remove it.

====================================================================
*/





/*
====================================================================
9️⃣ 


/*
====================================================================
🔟 STALE CLOSURE PROBLEM
====================================================================

Example:

useEffect(() => {
  setInterval(() => {
    console.log(count);
  }, 1000);
}, []);

You expect count to update.
But it always logs initial value.

WHY?
Because effect captured old count value.

This is called:
👉 Stale Closure

HOW TO FIX?

Include count in dependency:
useEffect(() => {
  const id = setInterval(() => {
    console.log(count);
  }, 1000);

  return () => clearInterval(id);

}, [count]);

Now effect re-runs when count changes.

====================================================================
*/


/*
====================================================================
1️⃣1️⃣ WHEN NOT TO USE useEffect
====================================================================

❌ Do NOT use useEffect for:
- Calculating derived values
- Simple data transformations
- Updating state based on props (without side effect)

Example (WRONG):

useEffect(() => {
  setFullName(first + " " + last);
}, [first, last]);

Better:
const fullName = first + " " + last;

🔥 RULE:
If it can be calculated during render, do NOT use useEffect.
useEffect is only for side effects.
====================================================================
*/


/*
====================================================================
1️⃣2️⃣ DIFFERENCE BETWEEN useEffect AND useLayoutEffect
====================================================================

useEffect:
✔ Runs AFTER paint
✔ Non-blocking
✔ Used for API, subscriptions, timers

useLayoutEffect:
✔ Runs BEFORE browser paint
✔ Blocks visual update
✔ Used for measuring DOM size
✔ Used for layout adjustments

--------------------------------------------------------------------

Most of the time:
✔ Use useEffect

Use useLayoutEffect only when necessary.

====================================================================
*/

