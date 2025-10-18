import { Link } from "react-router-dom";

function CardPizza({ id, name, price, ingredients, img, desc, onAddToCart }) {
  return (
    <div className="card m-3 shadow-sm" style={{ width: "20rem" }}>
      <img src={img} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>

        {/* Descripción opcional */}
        {/* <p className="card-text text-start">{desc}</p> */}

        <p className="card-text">
          <b>Precio:</b> ${price.toLocaleString()}
        </p>

        <p className="card-text">
          <b>Ingredientes:</b>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </p>

        <div className="d-flex justify-content-between gap-2">
          <Link to={`/pizza/${id}`} className="btn btn-outline-primary d-flex">
            Ver más 👀
          </Link>

          <button className="btn btn-success d-flex" onClick={onAddToCart}>
            Añadir 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardPizza;
