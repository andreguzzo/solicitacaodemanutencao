// app.js
import express from 'express';
import bodyParser from 'body-parser';
import db from './src/db.js';
import routes from './src/routes.js';
import 'dotenv/config'
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '50mb' })); // Aumente o limite conforme necessário
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); // Aumente o limite conforme necessário
app.use(cors());
app.get('/', (req, res) => {
  res.send('Estou up!');
});
app.use('/api', routes);




// Sincronize o Sequelize com o banco de dados e inicie o servidor
(async () => {
  try {
    await db.sync(); // Isso criará as tabelas no banco de dados
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao sincronizar o Sequelize:', error);
  }
})();
