import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useTheme } from "../../Hooks/useTheme";
import styles from "./Navbar.module.css";

const Navbar = () => {

  const { theme, changeTheme } = useTheme();
  const isDarkMode = theme === "dark" || false;
  const { authState } = useAuthContext();

  const navigate = useNavigate()
  const redirect = () =>{
    navigate('/')
  };

  const logout = () => {
    redirect()
    window.location.reload();
    localStorage.clear()
  };

  const themeToggleButton = () => {
    if (theme === 'light') {
      changeTheme('dark')
    } else {
      changeTheme('light')
    }
  };

  return (
    <header className="sticky-top">
      <nav
        className={`navbar navbar-expand-sm ${isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}
        aria-label="Third navbar example"
      >
        <div className={`container`}>
          <Link className={`navbar-brand ${styles.navbarBrand}`} to={"/home"}>
            DH Odonto
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample03"
            aria-controls="navbarsExample03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarsExample03"
          >
            <ul className="navbar-nav mb-2 mb-sm-0">
              <li className={`nav-item ${styles.navBarLink}`}>
                <Link className="nav-link" to={"/home"}>
                  Home
                </Link>
              </li>
              <li className={`nav-item ${styles.navBarLink}`}>
                {(authState.auth === '') ? 
                  <Link className="nav-link" to={"/login"}>
                    Login
                  </Link> 
                  :
                  <button className={`btn ${theme === 'dark' ? 'button-dark' : 'button-light'}`} onClick={() => logout()}>
                    Logout
                  </button>
                }
              </li>
              <li className={`nav-item`}>
                <button
                  className={`btn btnDark ${theme === 'dark' ? 'btn-dark' : 'btn-light'} ${styles.btnStyle}`}
                  onClick={themeToggleButton}
                >
                  {theme === 'dark' ? '☀' : '🌙'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
