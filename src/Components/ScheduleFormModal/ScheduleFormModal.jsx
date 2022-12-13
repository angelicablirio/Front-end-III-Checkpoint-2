import { useTheme } from '../../Hooks/useTheme';
import ScheduleForm from '../ScheduleForm/ScheduleForm';
import styles from './ScheduleFormModal.module.css';

const ScheduleFormModal = () => {

  const { theme } = useTheme();
  const isDarkMode = theme === "dark" || false;

  return (
    <div className={`modal fade`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className={`modal-content ${isDarkMode ? styles.DarkModal : ''}`}>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Selecione o dentista, paciente e a data e hora</h1>
            <button type="button" className={`btn-close ${isDarkMode ? styles.closeButtonDark : ''}`} data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <ScheduleForm />
          </div>
        </div>
      </div>
    </div >

  );
};

export default ScheduleFormModal;
