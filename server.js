// Importar o módulo express para criar um servidor web
const express = require("express");
// Importar o módulo V1Route para definir as rotas da versão 1 da API
const V1Route = require("./app/V1/V1.routes.js");
// Criar uma instância do express
const app = express();

// Adiciona suporte a JSON 
app.use(express.json());

// Rota simples para a raiz da API
app.get("/", (req, res) => {
  // Enviar uma resposta em formato JSON com uma mensagem
  res.json({ message: "hello world." });
});

// Usar o módulo V1Route para definir as rotas da versão 1 da API
app.use('/v1',V1Route())

// Definir a porta e iniciar a API
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // Exibir uma mensagem no console informando a porta em que a API está rodando
  console.log(`Server is running on port ${PORT}.`);
});
