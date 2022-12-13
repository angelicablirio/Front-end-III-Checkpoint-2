import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import styles from "./Card.module.css";

const Card = (props) => {

  const { theme } = useTheme()
  
  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div className={`card ${theme}`}>
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
          <button className={styles.favButton} onClick={() => props.handleToggleFavorite()}>{props.checkIfIsFavorite()}</button>
        </div>
      </div>
    </>
  );
};

export default Card;
