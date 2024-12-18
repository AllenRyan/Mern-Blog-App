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
import CreatePost from "./pages/createPost.jsx";
import AdminPrivateRouter from "./components/adminPrivateRouter.jsx";
import UpdatePost from "./pages/updatePost.jsx";
import PostPage from "./pages/PostPage.jsx";
import ScrollToTop from './components/ScrollToTop.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <>
    <ScrollToTop/>
    <Layout />
    </>, // Use Layout as the root element
    children: [
      { path: '', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'sign-in', element: <Signin /> },
      { path: 'sign-up', element: <Signup />},
      {path: 'dashboard', element: <PrivateRouter>
      <Dashboard/>
      </PrivateRouter> },
      {path: 'create-post', element: <AdminPrivateRouter>
       <CreatePost/>
      </AdminPrivateRouter> },
      {path: 'update-post/:postId', element: <AdminPrivateRouter>
       <UpdatePost/>
      </AdminPrivateRouter> },
      {path: 'post/:postSlug', element:<PostPage/>}

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
