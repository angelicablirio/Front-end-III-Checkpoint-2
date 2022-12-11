import { useEffect, useState } from "react";
import ScheduleFormModal from "../ScheduleFormModal/ScheduleFormModal";
import styles from "./DetailCard.module.css";
import { useParams } from "react-router-dom";

const DetailCard = () => {
  const { id } = useParams();
  const [dentist, setDentist] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      fetch(`https://dhodonto.ctdprojetos.com.br/dentista/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setDentist(data);
        });
    }
    fetchData();
    //Nesse useEffect, você vai fazer um fetch na api passando o 
    //id do dentista que está vindo do react-router e carregar os dados em algum estado
  }, [id]);

  return (
    <>
      {dentist ? (
      <>
        <h1>Detail about Dentist {dentist?.nome}</h1>
        <section className="card col-sm-12 col-lg-6 container">
          {/* //Na linha seguinte deverá ser feito um teste se a aplicação
          // está em dark mode e deverá utilizar o css correto */}
          <div
            className={`card-body row`}
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
                {/* //Na linha seguinte deverá ser feito um teste se a aplicação
                // está em dark mode e deverá utilizado o css correto */}
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  className={`btn btn-light ${styles.button
                    }`}
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
