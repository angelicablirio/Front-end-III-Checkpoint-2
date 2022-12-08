import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Components/MainLayout/MainLayout";
import Detail from "./Routes/Detail";
import Home from "./Routes/Home";
import Login from "./Routes/Login";


function App() {

  const appRouter = createBrowserRouter([
    {
      path: '',
      element:<MainLayout />,
      children: [
        {
          path: 'home',
          element:<Home />,
      },
      {
        path: 'login',
        element:<Login />,
      },
      {
        path: 'detail',
        element:<Detail />,
      }
    ],
  }
]);

  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;
