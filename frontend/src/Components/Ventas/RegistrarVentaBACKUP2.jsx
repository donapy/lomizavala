import React, { useState } from "react";
import Axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CartProvider, useCart } from "react-use-cart";

export const RegistrarVenta = () => {
  const [inputs, setInputs] = useState({
    tipo: "local",
  });
  const [carrito, setCarrito] = useState([]);

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
    refetchListaProductos,
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
      // console.log(`Datos: ${result.data}`);
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
      // console.log(`Datos: ${result.data.toString()}`);
      return result.data;
    } catch (error) {
      return error;
    }
  };

  function Page() {
    const { addItem, inCart, setCartMetadata } = useCart();

    const products = listaProductos;

    return (
      <div>
        {/* <button onClick={() => setCartMetadata({ hello: "world" })}>
          Set metadata
        </button> */}
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
    const {
      isEmpty,
      cartTotal,
      items,
      updateItemQuantity,
      removeItem,
      emptyCart,
      // metadata,
    } = useCart();

    if (isEmpty) return <p>Sin productos</p>;

    return (
      <>
        <ul>
          {items.map((item) => (
            <p key={item.id}>
              {item.quantity} x {item.name}
              <button
                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
              >
                -1
              </button>
              <button
                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
              >
                +1
              </button>
              <button onClick={() => removeItem(item.id)}>
                Eliminar &times;
              </button>
            </p>
          ))}
        </ul>
        {!isEmpty && <button onClick={emptyCart}>Limpiar Productos</button>}
        <p>
          {/* Cart ({totalUniqueItems} - {cartTotal}) */}
          Total: {cartTotal}
        </p>

        {/* <pre>{JSON.stringify(metadata, null, 2)}</pre> */}
      </>
    );
  }

  const handleSubmit = async () => {
    // let orden = [...inputs, ...carrito];
    // console.log(`registrando: ${JSON.stringify(orden)}`);
    console.log(`Inputs: ${JSON.stringify(inputs)}`);
    console.log(`Carrito: ${JSON.stringify(carrito)}`);
    setInputs({
      tipo: "local",
    });
    setCarrito([]);
  };

  const handleItems = (dataitem, action) => {
    switch (action) {
      case "add":
        // setInputs((values) => ({ ...values, items: dataitem }));
        setCarrito([...carrito, dataitem]);
        console.log(`Added new item to carrito: ${carrito}`);
        break;

      case "edit":
        setCarrito(
          carrito.filter((producto) => {
            if (producto.id === dataitem.id) {
              producto.quantity = dataitem.quantity;
              producto.price = dataitem.price;
            }
            return producto;
          })
        );
        console.log(`Edited item in carrito: ${carrito}`);
        break;

      case "delete":
        setCarrito(
          carrito.filter((producto) => {
            return producto.id !== dataitem.id;
          })
        );
        console.log(`Deleted an item in carrito: ${carrito}`);
        break;
      default:
        break;
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "pegleg" || name === "eyepatch" || name === "hookhand") {
      setInputs((values) => ({ ...values, [name]: !inputs[name] }));
    } else {
      setInputs((values) => ({ ...values, [name]: value }));
    }
  };

  if (isLoading || isLoading2) {
    return <h1>Loading...</h1>;
  }

  return (
    <div id="panel-venta">
      <div id="left-panel-venta">
        <h3>Registro de Orden</h3>

        <div>
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
                <option value="llevar">Lllevar</option>
              </select>
            </label>
          </div>
        </div>

        <>
          <CartProvider
            id="cart-products"
            onItemAdd={(item) => {
              console.log(`Item ${item.id} added!`);
              handleItems(item, "add");
            }}
            onItemUpdate={(item) => {
              console.log(`Item ${item.id} updated.!`);
              handleItems(item, "edit");
            }}
            onItemRemove={(item) => {
              console.log(`Item removed! ${item}`);
            }}
          >
            <Cart />
            <Page />
          </CartProvider>
        </>
        <br />
        <div>
          <button onClick={handleSubmit}>Registrar Orden</button>
        </div>
      </div>
      <div id="right-panel-venta">
        <div>
          <h3>
            Lista de Ordenes Activas
            <button onClick={refetchListaVentas}>Actualizar</button>
          </h3>
        </div>
        <div>
          {listaVentas.map((item, key) => {
            return (
              <div key={key}>
                <p>
                  Nombre pedido: {item.nombrepedido} - Pagado: {item.pagado}
                </p>
                <p>
                  Fecha: {item.fecha} - Tipo: {item.tipo}
                </p>
                <p>{item.items}</p> {/*Verificar*/}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
