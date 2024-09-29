import CustomRouter from "./customRouter.js"
import { login, register } from "../controller/user.controller.js";

export default class UserRouterCustom extends CustomRouter{
    init(){
        this.post('/login', login)
        this.post('/register', register)
    }
}