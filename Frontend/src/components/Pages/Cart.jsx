// import { useCart } from "../../store/CartContext.jsx";  
// import {useUser} from "../../store/UserContext.jsx";
// // import { pizzaCart } from "../../assets/js/pizzas.js";

// const Cart = () => {
//   const { cart, increment, decrement, total } = useCart();
//   const { token } = useUser();

//   return (
//     <div className="container mt-4">
//       <h3>🛒 Carrito de Compras</h3>

//       {cart.length === 0 ? (
//         <p>Ooops! Pensando en qué comer aún? 🤔, tu carrito está vacío, pero con unas ganas de llenarse de pizzas!</p>
//       ) : (
//         <ul className="list-group">
//           {cart.map((pizza) => (
//             <li
//               key={pizza.id}
//               className="list-group-item d-flex justify-content-between align-items-center"
//             >
//               {/* Imagen + Nombre */}
//               <div
//                 className="d-flex align-items-center gap-3"
//                 style={{ width: "40%" }}
//               >
//                 <img src={pizza.img} alt={pizza.name} width="60" />
//                 <span className="fw-bold">{pizza.name}</span>
//               </div>

//               {/* Precio */}
//               <div style={{ width: "20%", textAlign: "center" }}>
//                 ${pizza.price.toLocaleString()}
//               </div>

//               {/* Controles cantidad */}
//               <div
//                 className="d-flex align-items-center gap-2"
//                 style={{ width: "30%", justifyContent: "center" }}
//               >
//                 <button
//                   className="btn btn-outline-danger btn-sm"
//                   onClick={() => decrement(pizza.id)}
//                 >
//                   -
//                 </button>
//                 <span>{pizza.quantity}</span>
//                 <button
//                   className="btn btn-outline-success btn-sm"
//                   onClick={() => increment(pizza.id)}
//                 >
//                   +
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       <h3 className="mt-3">Total: ${total.toLocaleString()}</h3>

    
//       <button
//         className="btn btn-success mt-2 mb-2"
//         disabled={!token || cart.length === 0} /* Deshabilitado si no hay token o el carrito está vacío , se agrega esta segunda condición para mejorar el U/X */
//       >
//         Finalizar Compra
//       </button>
//     </div>
//   );
// };
// export default Cart;
import axios from "axios";
import { useCart } from "../../store/CartContext.jsx";
import { useUser } from "../../store/UserContext.jsx";

const Cart = () => {
  const { cart, increment, decrement, total } = useCart();
  const { token } = useUser();

  // 🔹 Función para procesar el checkout con token JWT
  const handlePurchase = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/checkouts",
        { cart },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Compra simulada con éxito 🎉");
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("❌ Error al realizar el checkout:", error);
      if (error.response?.status === 401) {
        alert("Tu sesión ha expirado o el token no es válido. Inicia sesión nuevamente.");
      } else {
        alert("No se pudo procesar la compra. Inténtalo otra vez, antes de que las pizzas se enfríen!");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h3>🛒 Carrito de Compras</h3>

      {cart.length === 0 ? (
        <p>
          Ooops! Pensando en qué comer aún? 🤔 Tu carrito está vacío, pero con
          unas ganas de llenarse de pizzas!
        </p>
      ) : (
        <ul className="list-group">
          {cart.map((pizza) => (
            <li
              key={pizza.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {/* Imagen + Nombre */}
              <div
                className="d-flex align-items-center gap-3"
                style={{ width: "40%" }}
              >
                <img src={pizza.img} alt={pizza.name} width="60" />
                <span className="fw-bold">{pizza.name}</span>
              </div>

              {/* Precio */}
              <div style={{ width: "20%", textAlign: "center" }}>
                ${pizza.price.toLocaleString("es-CL")}
              </div>

              {/* Controles cantidad */}
              <div
                className="d-flex align-items-center gap-2"
                style={{ width: "30%", justifyContent: "center" }}
              >
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => decrement(pizza.id)}
                  aria-label={`Disminuir cantidad de ${pizza.name}`}
                >
                  -
                </button>
                <span>{pizza.quantity}</span>
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => increment(pizza.id)}
                  aria-label={`Aumentar cantidad de ${pizza.name}`}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h3 className="mt-3">Total: ${total.toLocaleString("es-CL")}</h3>

      {/* Botón checkout */}
      <button
        className="btn btn-success mt-2 mb-2"
        disabled={!token || cart.length === 0}
        onClick={handlePurchase}
      >
        Finalizar Compra
      </button>

      {!token && (
        <p className="text-muted">
          🔒 Inicia sesión para poder finalizar tu compra.
        </p>
      )}
    </div>
  );
};

export default Cart;
