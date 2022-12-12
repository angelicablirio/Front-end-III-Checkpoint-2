import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Components/MainLayout/MainLayout";
import { ThemeProvider } from "./hooks/useTheme";
import Detail from "./Routes/Detail";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Schedule from "./Routes/Schedule";


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
        path: 'dentist/:id',
        element:<Detail />,
      },
      {
        path: 'schedule',
        element:<Schedule />,
      }
    ],
    }
  ]);

  return (
    <ThemeProvider>
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  );
}

export default App;
