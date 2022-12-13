import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useTheme } from "../../Hooks/useTheme";
import styles from "./Form.module.css";

const LoginForm = () => {

  const [nameUser, setNameUser] = useState('');
  const [passwordUser, setPasswordUser] = useState('');
  const [formularioErro, setFormularioErro] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark" || false;
  const { authState, changeAuth } = useAuthContext();


  const validateName = (nameUser) => {
    return nameUser.length >= 5 ? nameUser : false
  }

  const validatePassword = (passwordUser) => {
    return /^(?=.*[0-9])(?=.*[a-z]).{8,12}$/i.test(passwordUser);
  }

  const navigate = useNavigate()

  useEffect(()=>{
    if(authState.auth !== ''){
      navigate("/home");
    }
  })

  const handleSubmit = (e) => {

    e.preventDefault()
  
    let userLogin = {
      username: nameUser,
      password: passwordUser
    }
  
    let requestHeaders = {
      'Content-Type': 'application/json'
    }
  
    let requestConfig = {
      method: 'POST',
      body: JSON.stringify(userLogin),
      headers: requestHeaders
    }

    if(!validateName(nameUser) || !validatePassword(passwordUser)){
           setFormularioErro(true)
      } else {

        fetch('https://dhodonto.ctdprojetos.com.br/auth', requestConfig)
  
     .then(response =>{
      if(response.ok) {
        response.json()
      .then(data=>{
        alert('Usuário logado com sucesso!')
        changeAuth({
          state: 'auth',
          auth: data.token
        })
        navigate("/home");
      })
    }
    else {
      alert('Erro ao logar, por favor confira seus dados')
    }
    })
      setFormularioErro(false)
    }
  };

  return (
    <>
      <div
         className={`text-center card container ${styles.card} ${
          isDarkMode ? styles.cardDark : ""}`}
      >
        <div className={`card-body  ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control  ${styles.inputSpacing}`}
              placeholder="Login"
              name="login"
              value={nameUser}
              onChange={(e) => setNameUser(e.target.value)}
              required
            />
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              type="password"
              value={passwordUser}
              onChange={(e) => setPasswordUser(e.target.value)}
              required
            />
            {
              formularioErro ? (
                <span>Verifique suas informações novamente</span>
              ) : null
            }
            <button className="btn btn-primary" type="submit">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
