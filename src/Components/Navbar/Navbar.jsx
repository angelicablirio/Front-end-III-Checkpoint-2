import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../Hooks/useTheme";
import { getTokenLocalStorage } from "../../utils/tokenLocalStorage";
import styles from "./Navbar.module.css";

const Navbar = () => {

  const { theme, changeTheme } = useTheme()
  const getToken = getTokenLocalStorage()


  const logout = () => {
    localStorage.clear()
  }

  // const handleToggleButton = () => {
  //   const logout = () => {
  //     localStorage.clear()
  //     setLogged(false)
  //   }

  //   if(getToken !== null){
  //     setLogged(true)
  //     return <button onClick={() => logout()}>Logout</button> 
        
  //   }else{
  //     setLogged(false)
  //     return <Link className="nav-link" to={"/login"}>Login</Link> 
  //   }
  // }


  const themeToggleButton = () => {
    if (theme === 'light') {
      changeTheme('dark')
    } else {
      changeTheme('light')
    }
  }

  return (
    <header className="sticky-top">
      <nav
        className={`navbar navbar-expand-sm navbar-${theme} bg-${theme}`}
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
                {/* Se o usuário estiver logado, deverá aparecer um botão de logout
                que vai apagar o token do localstorage.
                Se o usuário estiver deslogado, um link fará um redirecionamento, com react-router,
                ao formulário de login
                O botão de logout deverá ser testado darkmode
                se sim, btn-dark, se não, btn-light */}
                <Link className="nav-link" to={"/login"}>Login</Link> 
              </li>
              <button className={`btn ${theme === 'dark' ? 'button-dark' : 'button-light'}`} onClick={() => logout()}>Logout</button> 

              <li className={`nav-item`}>
                <button
                  className={`btn ${theme === 'dark' ? 'btn-dark' : 'btn-light'} ${styles.btnStyle}`}
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
