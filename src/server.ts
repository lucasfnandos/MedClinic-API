import 'dotenv/config';
import 'reflect-metadata';
import { AppDataSource } from './database/data-source';
import express from 'express';
import cors from "cors";
import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = Number(process.env.PORT) || 3000;

AppDataSource.initialize().then(() => {
    console.log("Data Source inicializado com sucesso!");
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}.`);
    })
}).catch((err) => {
    console.log("Erro ao inicializar o Data Source", err);
})