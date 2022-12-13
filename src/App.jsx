import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Components/MainLayout/MainLayout";
import { ThemeProvider } from "./hooks/useTheme";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import Login from "./routes/Login";


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
