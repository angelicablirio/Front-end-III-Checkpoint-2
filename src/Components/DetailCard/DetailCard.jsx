import { useEffect, useState } from "react";
import ScheduleFormModal from "../ScheduleFormModal/ScheduleFormModal";
import styles from "./DetailCard.module.css";
import { useParams } from "react-router-dom";
import { useTheme } from "../../Hooks/useTheme";

const DetailCard = () => {

  const { theme } = useTheme();
  const isDarkMode = theme === "dark" || false;
  const { id } = useParams();
  const [dentist, setDentist] = useState(undefined);

  useEffect(() => {
      fetch(`https://dhodonto.ctdprojetos.com.br/dentista?matricula=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setDentist(data);
        });
  }, [id]);

  return (
    <>
      {dentist ? (
      <>
        <h1>Detalhes sobre o dentista {dentist?.nome}</h1>
        <section className={`card col-sm-12 col-lg-6 container ${theme}`}>
          <div
            className={`card-body row ${isDarkMode ? styles.cardDark : ""}`}
          >
            <div className="col-sm-12 col-lg-6">
              <img
                className="card-img-top"
                src="/images/doctor.jpg"
                alt="doctor placeholder"
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <ul className="list-group">
                <li className="list-group-item">Nome: {dentist.nome}</li>
                <li className="list-group-item">
                  Sobrenome:  {dentist.sobrenome}
                </li>
                <li className="list-group-item">
                  Usuário: {dentist.usuario.username}
                </li>
              </ul>
              <div className="text-center">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  className={`btn ${isDarkMode ? 'btn-dark' : 'button-light'} ${styles.button}`}
                >
                  Marcar consulta
                </button>
              </div>
            </div>
        </div>
        </section>
      </>
      ) : null }
      <ScheduleFormModal />
    </>
  );
};

export default DetailCard;
