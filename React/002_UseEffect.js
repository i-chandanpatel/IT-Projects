/*
====================================================================
REACT useEffect + LIST RENDERING EXPLANATION FILE
====================================================================

This file explains:

1️⃣ Problem with calling API outside useEffect
2️⃣ How useEffect works
3️⃣ Why we pass empty dependency array []
4️⃣ Why "key" is required in list rendering
5️⃣ StrictMode behavior in React 18+
6️⃣ Cleanup functions in useEffect
7️⃣ How React internally uses "key" during reconciliation
8️⃣ How useEffect can cause infinite loops
9️⃣ Dependency array mental model (closures & best practices)
🔟 Stale closure problem in effects
1️⃣1️⃣ When NOT to use useEffect
1️⃣2️⃣ Difference between useEffect and useLayoutEffect
1️⃣3️⃣ Production vs Development behavior
====================================================================
*/


/*
====================================================================
1️⃣ PROBLEM WITH COMMENTED CODE (Calling API outside useEffect)

You previously had:

async function GitHubProfile() {
  const response = await fetch("https://api.github.com/users");
  const data = await response.json();
  setUsers(data);
}

GitHubProfile();  // ❌ Called directly inside component

--------------------------------------------------------------------

🚨 WHY IS THIS WRONG?

Because React components re-run every time state changes.

What happens step-by-step:

1. Component renders
2. GitHubProfile() runs
3. setUsers(data) updates state
4. State update causes re-render
5. Re-render calls GitHubProfile() again
6. Infinite loop 🔁

This causes:
❌ Continuous API calls
❌ Performance issues
❌ Possible crash

--------------------------------------------------------------------

🔥 IMPORTANT RULE:

Never call state-updating functions directly
inside the component body.

Side effects (API calls, timers, subscriptions)
must go inside useEffect.

====================================================================
*/


/*
====================================================================
2️⃣ HOW useEffect WORKS

Syntax:

useEffect(() => {
   // side effect code
}, [dependencies]);

--------------------------------------------------------------------

What is a "side effect"?

Anything that:
✔ Fetches data
✔ Uses setTimeout / setInterval
✔ Accesses DOM
✔ Subscribes to external services

--------------------------------------------------------------------

HOW useEffect WORKS INTERNALLY:

1. Component renders
2. React paints UI to screen
3. After render completes → useEffect runs

Important:
useEffect runs AFTER rendering,
not during rendering.

This prevents infinite loops and
keeps rendering pure.

====================================================================
*/


/*
====================================================================
3️⃣ WHY WE PASS EMPTY ARRAY [] ?

Example:

useEffect(() => {
   GitHubProfile();
}, []);

The second argument is called:
👉 Dependency Array

--------------------------------------------------------------------

WHAT DOES [] MEAN?

Empty array means:

✔ Run only ONCE
✔ Run after first render
✔ Similar to componentDidMount (class components)

--------------------------------------------------------------------

Different Cases:

1️⃣ No dependency array:
Runs after EVERY render.

2️⃣ With empty array []:
Runs only once after initial render.

3️⃣ With dependencies:
Runs on first render and whenever dependencies change

--------------------------------------------------------------------

USE CASE FOR []:

✔ API calls (fetch data once)
✔ Initial setup
✔ Loading initial data

In your GitHub example:
We fetch users only once when page loads.

====================================================================
*/


/*
====================================================================
4️⃣ WHY "key" IS REQUIRED IN <img> TAG?

Example:

users.map(user => (
  <img key={user.login} ... />
))

--------------------------------------------------------------------

WHY key IS REQUIRED?

When rendering lists, React needs to:

✔ Identify each element uniquely
✔ Track changes efficiently
✔ Update only changed items
✔ Avoid re-rendering everything

React uses key to compare:

Previous list  VS  New list

This process is called:
👉 Reconciliation (Virtual DOM diffing)

--------------------------------------------------------------------

WHAT HAPPENS WITHOUT key?

React shows warning:

"Each child in a list should have a unique key prop."

Without key:
❌ Performance issues
❌ Wrong DOM updates
❌ UI bugs

--------------------------------------------------------------------

BEST PRACTICE:

✔ Use unique id from data (user.id)
✔ Avoid using index if possible
✔ Key must be stable and unique

Example:

key={user.id}  ✅ Best
key={user.login} ✅ Good if unique
key={index} ❌ Avoid if list changes

--------------------------------------------------------------------

🔥 SIMPLE SUMMARY

useEffect → Controls side effects
[] → Run effect only once
key → Helps React track list items
key is NOT related to useEffect

====================================================================
*/


/*
====================================================================
FINAL UNDERSTANDING

Your flow now works like this:

1. Component renders
2. useEffect runs once (because [])
3. API call fetches data
4. setUsers updates state
5. Component re-renders with users
6. users.map() displays images
7. key helps React efficiently update DOM

====================================================================
*/


/*
====================================================================
5️⃣ WHY StrictMode SOMETIMES CALLS useEffect TWICE
====================================================================

If you are using React 18+, you might notice:

✔ useEffect runs twice in development
✔ API gets called twice
✔ Console logs appear twice

This usually happens because of:

<React.StrictMode>

--------------------------------------------------------------------

WHAT IS StrictMode?

StrictMode is a development tool
that helps detect unsafe side effects.

It intentionally runs certain lifecycle logic twice
ONLY in development mode.

--------------------------------------------------------------------

WHY DOES IT RUN useEffect TWICE?

In React 18 (development only):

React simulates:

Mount → Unmount → Mount again

This helps detect:
✔ Side effects that are not cleaned properly
✔ Memory leaks
✔ Unsafe state updates

--------------------------------------------------------------------

IMPORTANT:

✔ This happens ONLY in development
✔ It does NOT happen in production build
✔ Your production app runs normally

--------------------------------------------------------------------

If you see double API calls in development,
it is usually because of StrictMode.

====================================================================
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

--------------------------------------------------------------------

WHAT IS THIS RETURN FUNCTION?

It is called:
👉 Cleanup Function

--------------------------------------------------------------------

WHEN DOES CLEANUP RUN?

✔ Before component unmounts
✔ Before effect runs again (if dependencies change)

--------------------------------------------------------------------

WHY IS CLEANUP IMPORTANT?

To prevent:

❌ Memory leaks
❌ Duplicate timers
❌ Multiple subscriptions
❌ Unexpected behavior

--------------------------------------------------------------------

REAL EXAMPLES WHERE CLEANUP IS REQUIRED:

✔ setInterval / setTimeout
✔ Event listeners
✔ WebSocket connections
✔ Subscriptions

--------------------------------------------------------------------

🔥 RULE:

If your effect creates something,
cleanup should remove it.

====================================================================
*/


/*
====================================================================
7️⃣ HOW REACT USES "key" INTERNALLY (RECONCILIATION)
====================================================================

When state updates,
React compares:

Old Virtual DOM
VS
New Virtual DOM

This comparison process is called:
👉 Reconciliation

--------------------------------------------------------------------

Example:

Old list:
[ A, B, C ]

New list:
[ A, C ]

Without keys:
React might think:
B changed to C (wrong assumption)

With keys:
React knows:
✔ A is same
✔ B is removed
✔ C is same

So React updates ONLY what changed.

--------------------------------------------------------------------

WHY THIS MATTERS?

Without stable keys:

❌ Wrong items may update
❌ Input fields may lose focus
❌ UI bugs may appear

--------------------------------------------------------------------

IMPORTANT:

Keys must be:

✔ Unique
✔ Stable
✔ Predictable

Best choice:
key={user.id}

Avoid:
key={index} (if list order can change)

====================================================================
*/


/*
====================================================================
8️⃣ HOW useEffect CAN CAUSE INFINITE LOOPS
====================================================================

Example of a mistake:

useEffect(() => {
  setCount(count + 1);
}, [count]);

--------------------------------------------------------------------

WHAT HAPPENS?

1. count changes
2. useEffect runs
3. setCount updates count
4. count changes again
5. useEffect runs again
6. Infinite loop 🔁

--------------------------------------------------------------------

WHY DOES THIS HAPPEN?

Because the effect updates
the same state that is in dependency array.

--------------------------------------------------------------------

HOW TO FIX?

✔ Make sure effect does not
  continuously update its own dependency

✔ Use conditional logic if needed

Example:

useEffect(() => {
  if (count < 5) {
    setCount(prev => prev + 1);
  }
}, [count]);

--------------------------------------------------------------------

🔥 IMPORTANT UNDERSTANDING

Render → Effect → State Update → Re-render

If effect keeps updating state
without stopping condition,
it creates a loop.

====================================================================
*/


/*
====================================================================
FINAL ADVANCED SUMMARY
====================================================================

✔ StrictMode may call useEffect twice (development only)
✔ useEffect can return cleanup function
✔ key helps React during reconciliation
✔ Incorrect dependencies can cause infinite loops

React Flow:

Render
↓
Commit to DOM
↓
useEffect runs
↓
State updates (if any)
↓
Re-render
↓
Repeat

Understanding this flow makes you
much stronger in React.

====================================================================
*/


/*
====================================================================
9️⃣ DEPENDENCY ARRAY MENTAL MODEL (VERY IMPORTANT)
====================================================================

The dependency array controls WHEN useEffect runs.

React checks:

"Did any dependency value change?"

If YES → run effect again
If NO → skip effect

--------------------------------------------------------------------

IMPORTANT RULE:

Every value used inside useEffect
should be listed in dependency array.

Example:

useEffect(() => {
  console.log(count);
}, [count]);  // count must be included

--------------------------------------------------------------------

WHY?

Because useEffect "captures" values
from the render in which it was created.

This is called:
👉 Closure

If dependency is missing,
you may get stale values (old state).

--------------------------------------------------------------------

🔥 SIMPLE RULE:

If you use something inside effect,
add it to dependency array.

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

--------------------------------------------------------------------

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

Many beginners overuse useEffect.

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

--------------------------------------------------------------------

🔥 RULE:

If it can be calculated during render,
do NOT use useEffect.

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


/*
====================================================================
1️⃣3️⃣ PRODUCTION VS DEVELOPMENT BEHAVIOR
====================================================================

In development:
✔ StrictMode may double run effects
✔ Extra warnings appear

In production:
✔ Effects run once
✔ No StrictMode double execution
✔ Optimized performance

Always test production build:

npm run build

Then preview it.

====================================================================
*/
