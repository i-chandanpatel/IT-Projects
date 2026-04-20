// 🔹 React + DOM setup
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 🔹 Global styles
import './index.css'

// 🔹 Main layout component
import App from './App.jsx'

// 🔹 React Router
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

// 🔹 Components
import { Home, About, Contact, User, Github, githubInfoLoader } from './components/index.js'



// ================== 🔁 OBJECT-BASED ROUTER ==================

// Old/alternative way of defining routes using objects
// Same logic, different syntax

// const router = createBrowserRouter([
//   {
//     path: '/',              // root path
//     element: <App/>,        // layout component
//     children: [             // nested routes (render inside <Outlet/>)

//       {
//         path: '',           // default route → "/"
//         element: <Home/>
//       },

//       {
//         path: 'about',      // "/about"
//         element: <About/>
//       }

//     ]
//   }
// ])


// 🔍 Explanation:
// - routes are written as objects instead of JSX
// - children → nested routes
// - same working as JSX version
// - harder to read when project grows ❌
// - JSX version is more popular ✅



// ================== 🔥 JSX-BASED ROUTER ==================

const router = createBrowserRouter(
  createRoutesFromElements(

    // Root layout
    <Route path='/' element={<App/>}>

      {/* Default route → "/" */}
      <Route path='' element={<Home/>}/>

      {/* Static routes */}
      <Route path='about' element={<About/>}/>
      <Route path='contact' element={<Contact/>}/>

      {/* Dynamic route */}
      <Route path='user/:userId' element={<User/>}/>

      {/* Loader route */}
      <Route 
        path='github' 
        element={<Github/>} 
        loader={githubInfoLoader} 
      />

    </Route>
  )
)


// 🔍 Explanation:
// - createRoutesFromElements → allows JSX style
// - easier to read and maintain
// - supports nesting clearly
// - most used in real projects ✅



// ================== 🚀 RENDER APP ==================

createRoot(document.getElementById('root')).render(
  <StrictMode>

    {/* Enables routing in whole app */}
    <RouterProvider router={router}/>

  </StrictMode>,
)