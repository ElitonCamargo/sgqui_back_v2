// Ordenar projetos visualizados ******************
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
// Importar rotas
import routes from './src/routes/index.js';

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// Servir arquivos estáticos da pasta uploads
// Obtenha o diretório atual usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/arquivos', express.static(path.join(__dirname, 'uploads')));


app.use('/', routes);

const PORT = 3031; 
app.listen(PORT,()=>{
    console.log(
        `API: Rodando - PORT: ${PORT}`,
        `Link de acesso local: http://localhost:${PORT}/`
    );
});
