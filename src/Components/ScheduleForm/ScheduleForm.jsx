import { useEffect, useState } from "react";
import { useTheme } from "../../Hooks/useTheme";
import { getTokenLocalStorage } from "../../utils/tokenLocalStorage";
import styles from "./ScheduleForm.module.css";

const ScheduleForm = () => {

  const [dentistList, setDentistList] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark" || false;


  useEffect(() => {
    fetch(`https://dhodonto.ctdprojetos.com.br/dentista`)
      .then((res) => res.json())
      .then((dentistArray) => {
        setDentistList(dentistArray);
      });

      fetch(`https://dhodonto.ctdprojetos.com.br/paciente`)
      .then((res) => res.json())
      .then((patientArray) => {
        setPatientList(patientArray.body);
      });

}, []);

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const auth = getTokenLocalStorage();

    fetch(`https://dhodonto.ctdprojetos.com.br/consulta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify({
          dentista: {
            matricula: data.dentist,
          },
          paciente: {
            matricula: data.patient,
          },
          dataHoraAgendamento: data.appointmentDate,
        }),
      }).then((response) => {
        if(response.ok) {
          alert("Consulta agendada com sucesso");
        }
        else{
          alert("Ocorreu um erro no agendamento, por favor tente novamente");
        }
      });
  };

  return (
    <>
      <div
        className={`text-center container ${isDarkMode ? styles.cardDark : ""}`}
      >
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentist
              </label>
              <select className="form-select" name="dentist" id="dentist">
            {dentistList.map((dentist) => (
                  <option key={dentist.matricula} value={dentist.matricula}>
                    {`${dentist.nome} ${dentist.sobrenome}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Patient
              </label>
              <select className="form-select" name="patient" id="patient">
                {patientList.map((patient) => (
                  <option key={patient.matricula} value={patient.matricula}>
                    {`${patient.nome} ${patient.sobrenome}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-12">
              <label htmlFor="appointmentDate" className="form-label">
                Date
              </label>
              <input
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <button
              className={`btn ${isDarkMode ? "button-dark" : "button-light"} ${styles.button}`}
              type="submit"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Agendar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;
