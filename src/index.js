import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import router from './routes/routes.js';

const server = express();

server.set('view engine', 'ejs');

server.use(express.urlencoded({ extended: true }));

server.use(morgan('tiny'));

server.use(express.json());

server.use(express.static('public'));

server.use(router);

server.listen(3000, () => {
  console.log('O servidor está rodando na porta 3000');
});
