import { Router } from "express";
import { login, register } from "../controller/user.controller.js";
// import CustomRouter from "./customRouter.js"

const router = Router();

router.post('/login', login)
router.post('/register', register)


export default router
// export default class UserRouterCustom extends CustomRouter{
//     init(){
//         this.post('/login', login)
//         this.post('/register', register)
//     }
// }


