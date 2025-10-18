import { useState, useEffect } from "react";
import CardPizza from "../CardPizza.jsx";
// import {pizzas} from '../assets/js/pizzas.js' Esta línea se reemplaza por el consumo de la API.
import Header from "../Header.jsx";
import {useCart} from "../../store/CartContext.jsx";
function Home() {
  const [pizzas, setPizzas] = useState([]);
  const { addToCart } = useCart();
  useEffect(() => {
    const getPizzas = async () => {
      const response = await fetch("http://localhost:5000/api/pizzas");
      const data = await response.json();
      setPizzas(data);
    };
    getPizzas();
  }, []);

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        {pizzas.map((pizza) => (
          <CardPizza
            key={pizza.id}
            id={pizza.id }
            name={`Pizza ${pizza.name}`}
            // desc={pizza.desc} 
            price={pizza.price}
            ingredients={pizza.ingredients}
            img={pizza.img}
            alt={pizza.name}
            onAddToCart={() =>
              addToCart({
                id: pizza.id,
                name: pizza.name,
                price: pizza.price,
                img: pizza.img,
              })
            }
          />
        ))}
      </div>
    </>
  );
}

export default Home;
