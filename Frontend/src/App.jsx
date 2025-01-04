import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import ProductDetails from "./ProductDetails";
const router=createBrowserRouter(
  [

    {
      path:'/',
      element:<Home></Home>
    },
    {
      path:'/product/:name',
      element:<ProductDetails></ProductDetails>
    }
    


  ]
)
function App() {


  return (
   <>
    <RouterProvider router={router}></RouterProvider>
   </>
  );
}

export default App;

