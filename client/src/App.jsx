import { Flowbite } from "flowbite-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Projects from "./pages/Projects.jsx";
import Layout from "./pages/Layout.jsx";
import FooterComp from "./components/footer.jsx";
import PrivateRouter from "./components/privateRoute.jsx";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Use Layout as the root element
    children: [
      { path: '', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'sign-in', element: <Signin /> },
      { path: 'sign-up', element: <Signup />},
      {path: 'dashboard', element: <PrivateRouter>
      <Dashboard/>
      </PrivateRouter> },
      { path: 'projects', element: <Projects /> }
    ]
  }
 
  
]);

function App() {
  return (
    <>
    <RouterProvider router={router}>
    </RouterProvider>
    <FooterComp />

    </>
    
  );
}

export default App;
