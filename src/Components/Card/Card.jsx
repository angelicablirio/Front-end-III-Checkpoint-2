import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../Hooks/useTheme";
import styles from "./Card.module.css";

const Card = (props) => {

  const { theme } = useTheme();
  const isDarkMode = theme === "dark" || false;
  const [favorite, setFavorite] = useState(false);

  const checkIfIsFavorite = () => {
    if(favorite){
      return "❌ Desfavoritar"
    }else{
      return "⭐ Favoritar"
      
    } 
  }

  const handleToggleFavorite = (e) => {
    e.preventDefault()
    if(favorite){
      alert("Dentista removido com sucesso")
      setFavorite(false)
    }else{
      alert("Dentista adicionado com sucesso")
      setFavorite(true)
    }
  };
  
  return (
    <>
      <div  className={`card ${isDarkMode ? styles.cardDark : ""}`}>
        <img
          className="card-img-top"
          src="/images/doctor.jpg"
          alt="doctor placeholder"
        />
        <div className={`card-body ${styles.CardBody}`}>
          <Link to={`/dentist/${props.item.matricula}`}>
            <h5 className={`card-title ${styles.title}`}>{props.item.nome}</h5>
          </Link>
        </div>
        <div>
          <p>{props.item.usuario.username}</p>
          <button
            className={`btn ${isDarkMode ? 'button-dark' : 'button-light'} ${styles.buttonFav}`} 
            onClick={(e) => handleToggleFavorite(e)}
            >
            {checkIfIsFavorite()}
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
