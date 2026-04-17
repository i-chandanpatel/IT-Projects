import Header from "./components/Header"
import Footer from "./components/Footer"
import { Outlet } from 'react-router-dom'  

// Outlet → special component from React Router
// It acts like a placeholder where child routes will render
// Whatever route is active (Home, About, etc.) will be shown here


export default function App() {

  return (
    <>
      {/* Header → common for all pages (navbar, logo, etc.) */}
      <Header/>

      {/* 
        Outlet → dynamic content area
        
        Example:
        If URL = "/" → Home component renders here
        If URL = "/about" → About component renders here
        If URL = "/contact" → Contact component renders here
        
        So Header + Footer stay same
        Only this part changes
      */}
      <Outlet/>

      {/* Footer → common for all pages */}
      <Footer/>
    </>
  )
}
