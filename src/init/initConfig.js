import express from 'express';
import dotenv from 'dotenv';
import router from '../routes/index.js';
import { __dirname } from '../utils.js';
import { connectionDB } from '../dao/mongo/connectionDB.js';
import { Server } from 'socket.io'
import { ROUTE_PATH } from '../constants/routesPath.js';
import chatRouter from '../routes/chat.routes.js'
import viewsProductsRouter from '../routes/views.products.routes.js'
import passport from 'passport';
import initializePassport from '../passport/jwt.passport.js';
import handlebars from 'express-handlebars'
import cookieParser from 'cookie-parser'

export const AppInit = (app) => {

    dotenv.config()
    connectionDB();
    // HTTP Server Up
		const httpServer = app.listen(process.env.PORT, () => console.log('Server up'))
// Websocket Server Up
		const io = new Server(httpServer)
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('./src/public'))
    app.use(cookieParser(process.env.SECRET))
    initializePassport()
    app.use(passport.initialize())

    // Handlebars config
    app.engine('handlebars', handlebars.engine())
    app.set('views', './src/views')
    app.set('view engine', 'handlebars')

    
    app.use('/', router);
    app.use(ROUTE_PATH.chat, chatRouter(io))
	app.use('/', viewsProductsRouter(io))
}