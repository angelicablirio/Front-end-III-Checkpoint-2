import { useEffect, useState } from "react";
import Card from "../Components/Card/Card";


const Home = () => {

  const [dentists, setDentists] = useState([]);

  useEffect(() => {
    fetch(`https://dhodonto.ctdprojetos.com.br/dentista`).then(
      response => {
        response.json().then(
          dentistArray => {
            setDentists(dentistArray)
          }
        )
      }
    )
  }, []);

  return (
    <>
      <h1>Home</h1>
      <div className="card-grid container">
        {dentists.map((data) => (
          <Card 
            {...dentists}
            key={data.matricula}
            item={data}
          />
        )  
        )}
        
      </div>
    </>
  );
};

export default Home;
