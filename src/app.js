import express from 'express';
import { __dirname } from './utils.js';
import { AppInit } from './init/initConfig.js';

const app = express()


try {
	AppInit(app);
} catch (error) {
	console.log('Error al inicializar servidor: ', error)
}


