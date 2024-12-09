import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Projects from "./pages/Projects.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/sign-in',
    element: <Signin />
  },
  {
    path: '/sign-up',
    element: <Signup />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/projects',
    element: <Projects />
  }

])
function App() {
  return(
    <>  
    <RouterProvider router={router}>

    </RouterProvider>
    </>
  );
}

export default App
