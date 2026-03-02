/*
====================================================================
FETCHING API USING useEffect (CORRECT PATTERN)
====================================================================

React components must stay pure during rendering.

Fetching data is a side effect.
Side effects must run AFTER rendering.

useEffect allows us to:
✔ Separate rendering logic from side effects
✔ Prevent infinite re-render loops
✔ Keep component predictable
*/

import { useState, useEffect } from "react";

function App1(){
  const [users,setUsers] = useState([]);

  useEffect(() => {
    async function GitHubProfile() {
      try {
        const response = await fetch("https://api.github.com/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    GitHubProfile();
  }, []); 
  // Empty dependency array → run once after initial render

  return (
  <>
    <h3>Github Users</h3>

    <div 
      style={{
        display:"flex", 
        justifyContent:"center", 
        alignItems:"center", 
        flexWrap:"wrap", 
        gap:"10px"
      }}
    >
      {
        users.map(user => (
          <img 
            key={user.login} 
            src={user.avatar_url} 
            height="100px" 
            width="100px" 
          />
        ))
      }
    </div>
  </> )
}


/*
====================================================================
WHY API MUST NOT BE CALLED OUTSIDE useEffect
====================================================================

If we call the API directly inside the component body:

Component render
→ API runs
→ setUsers updates state
→ State update triggers re-render
→ API runs again
→ Infinite loop

This causes:
❌ Continuous API calls
❌ Performance issues
❌ Possible browser crash
❌ API rate limiting

Core rule:
Rendering must stay PURE.
Side effects must be placed inside useEffect.



====================================================================
HOW useEffect EXECUTES INTERNALLY
====================================================================

React works in two phases:

Render Phase  → Calculates JSX (must stay pure)
Commit Phase  → Updates DOM and runs effects

useEffect runs in the Commit Phase.
That means it runs AFTER the UI is painted.

This separation prevents render-side loops
and keeps state updates controlled.



====================================================================
DEPENDENCY ARRAY EXPLANATION
====================================================================

useEffect(() => {
   GitHubProfile();
}, []);  //Here [] is Dependency Array

The dependency array controls WHEN the effect runs.

Empty array [] means:
✔ Run only once
✔ After first render
✔ Similar to componentDidMount

Other cases:

No dependency array
→ Runs after every render

With dependencies [a, b]
→ Runs after first render
→ Runs again whenever a or b changes

Mental model:
React checks whether dependency values changed.
If changed → run effect
If not changed → skip effect

Important rule:
Every external value used inside useEffect
should be listed in dependency array.

Reason:
useEffect captures values using closure.
Missing dependencies can cause stale state bugs.



====================================================================
WHY "key" IS REQUIRED IN LIST RENDERING
====================================================================

When rendering lists, React must identify
which items changed between renders.

This process is called:
Reconciliation (Virtual DOM diffing)

key helps React:
✔ Identify elements uniquely
✔ Update only changed items
✔ Avoid unnecessary DOM operations

Without proper keys:
❌ Incorrect UI updates
❌ Performance problems
❌ Input focus bugs

Best practice:
key={user.id}      → Best (stable & unique)
key={user.login}   → Acceptable if unique
key={index}        → Avoid if list order can change

Keys must be:
✔ Unique
✔ Stable
✔ Predictable

Note:
key is related to list rendering,
not to useEffect.



====================================================================
STRICT MODE BEHAVIOR (React 18+)
====================================================================

In development mode,
useEffect may run twice.

Why?

React.StrictMode intentionally simulates:
Mount → Unmount → Mount

This helps detect:
✔ Memory leaks
✔ Unsafe side effects
✔ Missing cleanup logic

Important:
✔ Happens only in development
✔ Does NOT happen in production
*/
