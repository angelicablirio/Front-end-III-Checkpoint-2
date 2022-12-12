import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { getTokenLocalStorage } from "../../utils/tokenLocalStorage";
import styles from "./ScheduleForm.module.css";

const ScheduleForm = () => {

  const [dentistList, setDentistList] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const { theme } = useTheme() 


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
    const token = getTokenLocalStorage();

    fetch(`https://dhodonto.ctdprojetos.com.br/consulta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center container ${theme}}`
        }
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
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
            <button
              className={`btn btn-${theme} ${styles.button}`}
              type="submit"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;
