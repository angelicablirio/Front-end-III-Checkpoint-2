import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";

const LoginForm = () => {

  const [nameUser, setNameUser] = useState('')
  const [passwordUser, setPasswordUser] = useState('')

  const navigate = useNavigate()

  const redirect = () =>{
    navigate('/home')
  }

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
  
    fetch('https://dhodonto.ctdprojetos.com.br/auth', requestConfig)
  
     .then(response =>{
      if(response.ok) {
        response.json()
        .then(data =>{
          alert('Usuário logado com sucesso!')
          const dataToken = data
          localStorage.setItem('token', JSON.stringify(dataToken))
          setTimeout(()=>{
            redirect()

          }, 2000)
      })
    }
    else {
      alert('Erro ao logar, por favor confira seus dados')
    }
    })
  };

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center card container ${styles.card}`}
      >
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control ${styles.inputSpacing}`}
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
            <button className="btn btn-primary" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
