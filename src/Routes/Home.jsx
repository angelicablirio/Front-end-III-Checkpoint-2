import { useEffect, useState } from "react";
import Card from "../Components/Card/Card";

const Home = () => {

  const [dentistas, setDentistas] = useState([]);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    fetch(`https://dhodonto.ctdprojetos.com.br/dentista`).then(
      response => {
        response.json().then(
          dentistArray => {
            setDentistas(dentistArray)
          }
        )
      }
    )
  }, []);

  const checkIfIsFavorite = () => {
    if(favorite){
      return "❌ Desfavoritar"
    }else{
      return "⭐ Favoritar"
      
    } 
  }

  const handleToggleFavorite = () => {
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
      <h1>Home</h1>
      <div className="card-grid container">
        {dentistas.map((data, index) => (
          <Card 
            key={index} 
            item={data}
            handleToggleFavorite={handleToggleFavorite}
            checkIfIsFavorite={checkIfIsFavorite}
          />
        )  
        )}
      </div>
    </>
  );
};

export default Home;
