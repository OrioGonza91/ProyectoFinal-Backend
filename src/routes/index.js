import { Router } from "express";
import { ROUTE_PATH } from "../constants/routesPath.js";
import productsRouter from './products.routes.js'
import cartsRouter from './carts.routes.js'
// import UserRouterCustom from './user.routes.js'
import viewsCartRouter from './views.cart.routes.js'
import viewsUserRouter from './views.user.routes.js'
import userRouter from "./user.routes.js"
const app = Router()


app.use(ROUTE_PATH.api_products, productsRouter)
app.use(ROUTE_PATH.api_carts, cartsRouter)
app.use(ROUTE_PATH.api_users, userRouter )
app.use(ROUTE_PATH.cart, viewsCartRouter)
app.use(ROUTE_PATH.view, viewsUserRouter )


export default app

