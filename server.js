const express = require("express");
const V1Route = require("./app/V1/V1.routes.js");
const app = express();



// Interpretar pedidos content-type - application/json como JSON
app.use(express.json());

// Rota simples
app.get("/", (req, res) => {
  res.json({ message: "hello world." });
});

app.use('/v1',V1Route())

// define a porta e inicia a API
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
