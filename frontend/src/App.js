import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomeClient } from "./Pages/HomeClient";
import { Error } from "./Pages/Error";
import { HomeUser } from "./Pages/HomeUser";
import { Login } from "./Pages/Login";
import { Ventas } from "./Pages/Ventas";
import { Clientes } from "./Pages/Clientes";
import { Usuarios } from "./Pages/Usuarios";
import { Proveedores } from "./Pages/Proveedores";
import { Productos } from "./Pages/Productos";
// import { EditarCliente } from "./Components/Clientes/EditarCliente";

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<HomeClient />} />
            <Route path="login" element={<Login />} />
            <Route path="menu" element={<HomeUser />} />
            <Route path="ventas" element={<Ventas />} />
            <Route path="clientes" element={<Clientes />} />
            {/* <Route path="clientes/editar/:id" element={<EditarCliente />} /> */}
            <Route path="proveedores" element={<Proveedores />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="productos" element={<Productos />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
