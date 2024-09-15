// Dependencies
import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'


// Routes
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import chatRouter from './routes/chat.routes.js'
import usersRouter from './routes/user.routes.js'

import viewsProductsRouter from './routes/views.products.routes.js'
import viewsCartRouter from './routes/views.cart.routes.js'
import viewsUserRouter from './routes/views.user.routes.js'


dotenv.config()
// Express config
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./src/public'))
app.use(cookieParser(process.env.SECRET))
// Handlebars config
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

const run = async () => {
	try{
		// DB Connection
		await mongoose.connect(process.env.URI)

		// HTTP Server Up
		const httpServer = app.listen(process.env.PORT, () => console.log('Server up'))
		// Websocket Server Up
		const io = new Server(httpServer)

		// Routes
		app.use('/api/products', productsRouter)
		app.use('/api/carts', cartsRouter)
		app.use('/api/users', usersRouter)
		app.use('/chat', chatRouter(io))
		app.use('/', viewsProductsRouter(io))
		app.use('/cart', viewsCartRouter)
		app.use('/users', viewsUserRouter )
		
	} catch (error) {
		console.error(error)
	}
}

run()