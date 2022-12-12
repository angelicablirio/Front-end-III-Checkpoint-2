import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import styles from "./Navbar.module.css";

const Navbar = () => {

  const [logged, setLogged] = useState(false)
  const { theme, changeTheme } = useTheme()
  const getToken = localStorage.getItem('token')

  console.log(getToken)

  const handleToggleButton = () => {
    const logout = () => {
      localStorage.clear()
      setLogged(false)
    }
    const login = () => {
      setLogged(true)

    }
    if(logged){
      //se o usuário estiver logado retorna este link, que ao clicar limpa o localStorage e coloca o login como false
      return <Link className="nav-link" to={"/"} onClick={() => logout()}>Logout</Link> 
    } else {
      //se o usuário não estiver logado retorna este link, que ao clicar está mudando o login para true, mas precisamos fazer alguma validação antes pois é preciso primeiro validar o envio das informações para depois mudar o usuário para logado
      return <Link className="nav-link" to={"/login"} onClick={() => login()}>Login</Link> 
    }

  }


  const themeToggleButton = () => {
    if (theme === 'light') {
      changeTheme('dark')
    } else {
      changeTheme('light')
    }
  }

  return (
    <header className="sticky-top">
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar navbar-dark bg-dark ou navbar-light bg-light*/}
      <nav
        className={`navbar navbar-expand-sm navbar-${theme} bg-${theme}`}
        aria-label="Third navbar example"
      >
        <div className={`container`}>
          {/* Ao clicar, o usuário deve ser redirecionado a home, com react-router */}
          <a className={`navbar-brand ${styles.navbarBrand}`} href="/home">
            DH Odonto
          </a>
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
                {handleToggleButton()}
              </li>

              <li className={`nav-item`}>
                {/* Ao ser clicado, esse botão mudará a aplicação para dark mode ou light mode.
                 Lembre-se de usar um estado no contexto para fazer essa alteração.
                 Na linha seguinte deverá ser feito um teste se a aplicação
                 está em dark mode e deverá utilizar o icone ☀ ou 🌙 e btn-dark ou btn-light*/}
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
