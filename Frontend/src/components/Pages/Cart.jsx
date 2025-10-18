// import { useState } from "react";
// import { pizzaCart } from "../../assets/js/pizzas.js";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState(pizzaCart);

//   // Aumentar cantidad
//   const addItem = (id) => {
//     setCartItems(
//       cartItems.map((item) =>
//         item.id === id ? { ...item, count: item.count + 1 } : item
//       )
//     );
//   };

//   // Disminuir cantidad
//   const removeItem = (id) => {
//     setCartItems(
//       cartItems
//         .map((item) =>
//           item.id === id ? { ...item, count: item.count - 1 } : item
//         )
//         .filter((item) => item.count > 0)
//     );
//   };

//   const total = cartItems.reduce((acc, item) => acc + item.price * item.count, 0);

//   return (
//     <div className="container mt-4">
//       <h3>🛒 Carrito de Compras</h3>
//       {cartItems.length === 0 ? (
//         <p>No hay productos en el carrito</p>
//       ) : (
//         <ul className="list-group">
//           {cartItems.map((pizza) => (
//             <li
//               key={pizza.id}
//               className="list-group-item d-flex justify-content-between align-items-center"
//             >
//               {/* Imagen + Nombre */}
//               <div className="d-flex align-items-center gap-3" style={{ width: "40%" }}>
//                 <img src={pizza.img} alt={pizza.name} width="60" />
//                 <span className="fw-bold">{pizza.name}</span>
//               </div>

//               {/* Precio */}
//               <div style={{ width: "20%", textAlign: "center" }}>
//                 ${pizza.price.toLocaleString()}
//               </div>

//               {/* Controles cantidad */}
//               <div className="d-flex align-items-center gap-2" style={{ width: "30%", justifyContent: "center" }}>
//                 <button
//                   className="btn btn-outline-danger btn-sm"
//                   onClick={() => removeItem(pizza.id)}
//                 >
//                   -
//                 </button>
//                 <span>{pizza.count}</span>
//                 <button
//                   className="btn btn-outline-success btn-sm"
//                   onClick={() => addItem(pizza.id)}
//                 >
//                   +
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       <h3 className="mt-3">Total: ${total.toLocaleString()}</h3>
//       <button className="btn btn-success mt-2 mb-2">Finalizar Compra</button>
//     </div>
//   );
// };

// export default Cart;
// --- IGNORE ---

// ---Versión Cart de hito-6 ----
// import { useCart } from "../../store/CartContext.jsx";
//  import { pizzaCart } from "../../assets/js/pizzas.js";
// const Cart = () => {
//   const { cart, increment, decrement, total } = useCart();

//   return (
//     <div className="container mt-4">
//       <h3>🛒 Carrito de Compras</h3>

//       {cart.length === 0 ? (
//         <p>No hay productos en el carrito</p>
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
//       <button className="btn btn-success mt-2 mb-2">Finalizar Compra</button>
//     </div>
//   );
// };

// export default Cart;

import { useCart } from "../../store/CartContext.jsx";  
import {useUser} from "../../store/UserContext.jsx";
// import { pizzaCart } from "../../assets/js/pizzas.js";

const Cart = () => {
  const { cart, increment, decrement, total } = useCart();
  const { token } = useUser();

  return (
    <div className="container mt-4">
      <h3>🛒 Carrito de Compras</h3>

      {cart.length === 0 ? (
        <p>Ooops! Pensando en qué comer aún? 🤔, tu carrito está vacío, pero con unas ganas de llenarse de pizzas!</p>
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
                ${pizza.price.toLocaleString()}
              </div>

              {/* Controles cantidad */}
              <div
                className="d-flex align-items-center gap-2"
                style={{ width: "30%", justifyContent: "center" }}
              >
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => decrement(pizza.id)}
                >
                  -
                </button>
                <span>{pizza.quantity}</span>
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => increment(pizza.id)}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h3 className="mt-3">Total: ${total.toLocaleString()}</h3>

    
      <button
        className="btn btn-success mt-2 mb-2"
        disabled={!token || cart.length === 0} /* Deshabilitado si no hay token o el carrito está vacío , se agrega esta segunda condición para mejorar el U/X */
      >
        Finalizar Compra
      </button>
    </div>
  );
};
export default Cart;
