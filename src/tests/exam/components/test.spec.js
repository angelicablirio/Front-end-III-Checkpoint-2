import { render, screen } from "../../test-utils"
import Login from '../../../Routes/Login';
import Card from "../../../Components/Card/Card"
import DetailCard from "../../../Components/DetailCard/DetailCard";
import Home from "../../../Routes/Home";
import Detail from "../../../Routes/Detail";
import ScheduleFormModal from "../../../Components/ScheduleFormModal/ScheduleFormModal";
import Navbar from "../../../Components/Navbar/Navbar";
import { fireEvent } from '@testing-library/react'


test('should show login form', () => {
  render(<Login />)
  expect(screen.getByText('Login')).toBeInTheDocument();
});

test('should show home on page', () => {
  render(<Home />)
  expect(screen.getByText('Home')).toBeInTheDocument();
});

test('should show selecione o dentista, paciente e a data e hora on page', () => {
  render(<ScheduleFormModal />)
  expect(screen.getByText('Selecione o dentista, paciente e a data e hora')).toBeInTheDocument();
});

test('should show home link in navbar', () => {
  render(<Navbar />)
  expect(screen.getByText('Home')).toBeInTheDocument();
});

test ('Fluxo login', () => {

  const { getByLabelText, getByText } = render(<Login />)
  const inputLogin = getByLabelText('login')
  const inputPassword = getByLabelText('password')
  const submitButton = getByLabelText('submit-button')

  fireEvent.change(inputLogin, { target: { value: 'dentistaAdmin' } })
  fireEvent.change(inputPassword, { target: { value: 'admin123' } })
  fireEvent.click(submitButton)

  setTimeout(() => {

      expect(screen.getByText('Home')).toBeInTheDocument()

  }, 2000)

})

