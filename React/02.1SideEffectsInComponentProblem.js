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

