/*
====================================================================
REACT BEGINNER MASTER NOTES
====================================================================

React = JavaScript library for building User Interfaces (UI)

Core Concepts You Must Understand:
1. React.createElement()
2. JSX (Syntactic Sugar)
3. Components
4. Props (Passing Data)
5. State (useState)
6. Rendering with ReactDOM
7. What JSX Can and Cannot Render
8. Styling in React
====================================================================
*/


/*
====================================================================
1️⃣ React.createElement()

This is how React creates UI elements internally.

Syntax:
React.createElement(type, props, ...children)

Example WITHOUT JSX:
--------------------------------------------------------------------
const element = React.createElement(
  "h1",
  { style: { color: "blue", fontSize: "30px" } },
  "Hello World"
);

Explanation:
- "h1" → HTML tag
- props → object (attributes, style, etc.)
- children → content inside element

Style in React.createElement:
- Must be an OBJECT
- CSS properties are camelCase
====================================================================
*/


/*
====================================================================
2️⃣ JSX (JavaScript XML)

JSX is syntactic sugar over React.createElement.

JSX:
<h1 style={{ color: "blue", fontSize: "30px" }}>
  Hello World
</h1>

Behind the scenes:
React.createElement(
  "h1",
  { style: { color: "blue", fontSize: "30px" } },
  "Hello World"
)

Important JSX Rules:
✔ Must return ONE parent element
✔ Use className instead of class
✔ style must be an object
✔ JavaScript inside {} only
====================================================================
*/


import { useState } from "react";


/*
====================================================================
3️⃣ COMPONENTS

A Component is a JavaScript function
that returns JSX.

Rules:
✔ Name must start with Capital Letter
✔ Must return JSX
✔ Can accept props (input data)

Components make UI reusable.
====================================================================
*/


/*
====================================================================
4️⃣ PROPS (Passing Data)

Props = Data passed from Parent → Child component.

Parent:
<Greet count={count} userName="Alice" />

Child receives props as parameter:
function Greet({ count, userName })

Props are:
✔ Read-only
✔ Immutable
✔ Used to customize components
====================================================================
*/


function Greet({ count, userName }) {

  /*
  JSX Rendering Rules inside {}

  ✔ Allowed:
    {count} → number
    {"Alice"} → string
    {true} → renders nothing
    {null} → renders nothing
    {[1,2,3]} → renders
    {[<p>Hi</p>, <p>Hello</p>]} → valid

  ❌ NOT Allowed:
    {{name: "Alice"}} → Object → ERROR
    Because React cannot render plain objects.

  Fix:
    JSON.stringify(obj)
  */

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        marginBottom: "10px"
      }}
    >
      <h3>
        Hello {userName}. Your count is {count}
      </h3>
    </div>
  );
}


/*
====================================================================
5️⃣ STATE (useState)

State = Data that changes over time.

Syntax:
const [state, setState] = useState(initialValue);

Here:
count → current state
setCount → function to update state

Important Rules:
❌ Never mutate state directly (count++)
❌ Never update state inside render
✔ Always use setCount()

Best Practice:
setCount(prev => prev + 1)
====================================================================
*/


function App() {

  // Creating state
  const [count, setCount] = useState(0);

  // Function to update state
  const increment = () => setCount(prev => prev + 1);

  return (
    <div style={{ textAlign: "center" }}>
      
      {/* Passing props to child component */}
      <Greet count={count} userName="Alice" />

      <button
        onClick={increment}
        style={{
          padding: "8px 15px",
          cursor: "pointer"
        }}
      >
        Increment Count
      </button>

    </div>
  );
}

export default App;


/*
====================================================================
6️⃣ RENDERING (ReactDOM)

React must connect to the real DOM.

In main.jsx / index.js:

import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(
  document.getElementById("root")
).render(<App />);

Explanation:
- createRoot() → Creates React root
- render(<App />) → Renders component tree
- React updates only changed parts (Virtual DOM)

====================================================================
*/


/*
====================================================================
7️⃣ WHAT REACT CAN RENDER

✔ Strings
✔ Numbers
✔ JSX
✔ Arrays of JSX
✔ null / undefined (renders nothing)
✔ Boolean (ignored visually)

❌ Cannot Render:
- Plain Objects
- Functions (unless called)
- Promises

Example Error:
<h1>{{name:"Alice"}}</h1>

Fix:
<h1>{JSON.stringify({name:"Alice"})}</h1>

====================================================================
*/


/*
====================================================================
8️⃣ STYLING IN REACT

1. Inline Style
   style={{ color: "red", fontSize: "20px" }}

2. External CSS
   import "./App.css"

3. Dynamic Styling
   style={{ color: count > 5 ? "red" : "green" }}

Important:
- CSS properties use camelCase
- Value must be string or number

====================================================================
*/


/*
====================================================================
9️⃣ IMPORTANT BEGINNER CONCEPTS YOU SHOULD KNOW

✔ React is Declarative (you describe UI state)
✔ State change → Re-render
✔ Props flow one direction (Parent → Child)
✔ Components can be nested
✔ Event handling uses camelCase (onClick)
✔ JSX is not HTML
✔ React uses Virtual DOM for performance

====================================================================
*/
