import React, { useState } from "react";
import Axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CartProvider, useCart } from "react-use-cart";

export const RegistrarVenta = () => {
  const {
    data: listaVentas,
    refetch: refetchListaVentas,
    isLoading,
  } = useQuery(["listaventas"], async () => {
    let data = await fetchListaVentas();
    // console.log(data);
    return data;
  });

  const {
    data: listaProductos,
    //refetchListaProductos,
    isLoading: isLoading2,
  } = useQuery(["listaproductos"], async () => {
    let data = await fetchListaProductos();
    // console.log(data);
    return data;
  });

  const fetchListaVentas = async () => {
    try {
      const result = await Axios.get(
        "http://localhost:5000/api/venta/getVentasActiva"
      );
      // console.log(`Datos: ${JSON.stringify(result.data)}`);
      return result.data;
    } catch (error) {
      return error;
    }
  };

  const fetchListaProductos = async () => {
    try {
      const result = await Axios.get(
        "http://localhost:5000/api/producto/getProductosActivo"
      );
      // console.log(`Datos: ${JSON.stringify(result.data)}`);
      return result.data;
    } catch (error) {
      return error;
    }
  };

  const handleEntregar = async (id) => {
    try {
      let payload = { entregado: true };
      // console.log(`Entregar: ${id}`);
      const result = await Axios.put(
        "http://localhost:5000/api/venta/updateVenta/" + id,
        payload
      );
      if (result.status === 200) {
        alert("Se ha entregado el pedido");
        refetchListaVentas();
      }
    } catch (error) {
      alert("Error al entregar el pedido");
    }
  };

  function Page() {
    const { addItem, inCart } = useCart();

    const products = listaProductos;

    return (
      <div>
        {/* <button onClick={() => setCartMetadata({ hello: "world" })}>
          Set metadata
        </button> */}
        <h3>Productos Disponibles</h3>
        {products.map((p) => {
          const alreadyAdded = inCart(p.id);

          return (
            <div key={p.id}>
              <button onClick={() => addItem(p)}>
                {alreadyAdded ? `+1 ${p.name}` : `+ ${p.name}`}
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  function Cart() {
    const [inputs, setInputs] = useState({
      tipo: "local",
    });
    const {
      isEmpty,
      cartTotal,
      items,
      updateItemQuantity,
      removeItem,
      emptyCart,
      // metadata,
    } = useCart();

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = async () => {
      let correctKey = items;
      correctKey.forEach(function (obj) {
        obj.idproducto = obj.id;
        delete obj.id;
        obj.cantidad = obj.quantity;
        delete obj.quantity;
        delete obj.name;
        delete obj.price;
        obj.subtotalproducto = obj.itemTotal;
        delete obj.itemTotal;
      });
      // console.log(`inputs: ${JSON.stringify(inputs)}`);
      // console.log(`items: ${JSON.stringify(correctKey)}`);
      // console.log(`Total carrito: ${cartTotal}`);
      let registrarOrden;
      registrarOrden = { ...inputs, totalgeneral: cartTotal };
      registrarOrden = { ...registrarOrden, items: correctKey };
      // console.log(`Payload: ${JSON.stringify(registrarOrden)}`);

      // realizar post para registrar la venta
      try {
        let result = await Axios.post(
          "http://localhost:5000/api/venta/newVenta",
          registrarOrden
        );
        // console.log(result);
        if (result.status === 201) {
          emptyCart();
          setInputs({
            tipo: "local",
          });
          alert("Se ha registrado la orden");
          refetchListaVentas();
        }
        if (result.status === 404) {
          alert("El RUC no pertenece a ningun cliente");
        }
      } catch (error) {
        error.response && alert(error.response.data.message);
      }
    };

    // if (isEmpty) return <p>Sin productos</p>;

    return (
      <>
        <div className="formulario-venta">
          <div>
            <label>
              Nombre Pedido:
              <input
                type="text"
                name="nombrepedido"
                placeholder="Juan Perez..."
                value={inputs.nombrepedido || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              RUC del Cliente:
              <input
                type="text"
                name="ruc"
                placeholder="123456-0..."
                value={inputs.ruc || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Tipo:
              <select name="tipo" onChange={handleChange}>
                <option value="local">Local</option>
                <option value="delivery">Delivery</option>
                <option value="carryout">Carryout</option>
                <option value="llevar">Llevar</option>
              </select>
            </label>
          </div>
        </div>
        <>
          {isEmpty ? (
            <div className="div-ordenes-items">
              <h4>Orden:</h4>
              <p>Sin productos agregados</p>
            </div>
          ) : (
            <div className="div-ordenes-items">
              <ul>
                <h3>Orden:</h3>
                {items.map((item) => (
                  <p key={item.id}>
                    {item.quantity} x {item.name}
                    <button
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity - 1)
                      }
                    >
                      -1
                    </button>
                    <button
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +1
                    </button>
                    <button onClick={() => removeItem(item.id)}>
                      Eliminar &times;
                    </button>
                  </p>
                ))}
              </ul>
              <button onClick={emptyCart}>Limpiar Productos</button>
              <p>Total: {cartTotal}</p>
              <div>
                <button onClick={handleSubmit} className="btn-azul">
                  Registrar Orden
                </button>
              </div>
            </div>
          )}
        </>
      </>
    );
  }

  if (isLoading || isLoading2) {
    return <h1>Loading...</h1>;
  }

  return (
    <div id="panel-venta">
      <div id="left-panel-venta">
        <h2>Registro de Orden</h2>
        <>
          <CartProvider
            id="cart-products"
            // onItemAdd={(item) => {
            //   console.log(`Item ${item.id} added!`);
            //   // handleItems(item, "add");
            // }}
            // onItemUpdate={(item) => {
            //   console.log(`Item ${item.id} updated.!`);
            //   // handleItems(item, "edit");
            // }}
            // onItemRemove={() => {
            //   console.log(`Item removed!`);
            // }}
          >
            <Cart />
            <Page />
          </CartProvider>
        </>
      </div>
      <div id="right-panel-venta">
        <div>
          <h2>
            Lista de Ordenes Activas
            {/* <button onClick={refetchListaVentas}>Actualizar</button> */}
          </h2>
        </div>
        <div>
          {listaVentas.map((item, key) => {
            return (
              <div
                key={key}
                className="div-ordenes"
                style={
                  item.tipo === "local"
                    ? { borderColor: "green" }
                    : item.tipo === "delivery"
                    ? { borderColor: "blue" }
                    : item.tipo === "carryout"
                    ? { borderColor: "yellow" }
                    : { borderColor: "red" }
                }
              >
                <p>
                  Nombre pedido: {item.nombrepedido} - Tipo: {item.tipo} -
                  Fecha: {item.fecha}
                </p>
                <div>
                  {item.items.map((prod, key2) => {
                    return (
                      <div key={key2}>
                        <p>
                          {prod.cantidad}x {prod.idproducto.nombre}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <button
                  className="btn-azul"
                  onClick={() => handleEntregar(item._id)}
                >
                  Entregar
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
