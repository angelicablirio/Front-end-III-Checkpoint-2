import { Outlet } from "react-router-dom";
import { useTheme } from "../../Hooks/useTheme";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";



function MainLayout() {

 const { theme } = useTheme();
 const isDarkMode = theme === "dark" || false;  

  return (
    <>
      <div className={`app ${isDarkMode ? "dark" : "light"}`}>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default MainLayout;