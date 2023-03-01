const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.urlencoded({ extended: false }));

app.use("/api/auditoria", require("./routes/auditoriaRoutes")); //1              100%
// app.use("/api/cliente", require("./routes/clienteRoutes")); //2               100% -- Merged with Proveedor
app.use("/api/compra", require("./routes/compraRoutes")); //3                    100%
app.use("/api/ingrediente", require("./routes/ingredienteRoutes")); //4          100%
app.use("/api/producto", require("./routes/productoRoutes")); //5                100%
// app.use("/api/proveedor", require("./routes/proveedorRoutes")); //6           Merged with Cliente
app.use("/api/rol", require("./routes/rolRoutes")); //7                          100%
app.use("/api/salario", require("./routes/salarioRoutes")); //8                  100%
app.use("/api/sucursal", require("./routes/sucursalRoutes")); //9                100%
app.use("/api/usuario", require("./routes/usuarioRoutes")); //10                 100%
app.use("/api/venta", require("./routes/ventaRoutes")); //11                     95% -- Falta timbrado?
app.use("/api/cliprov", require("./routes/cliprovRoutes")); //12                 100%
app.use("/api/timbrado", require("./routes/timbradoRoutes")); //13               100%

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Backend running on ${port}`.cyan);
});
