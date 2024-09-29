import { Router } from "express";

export default class CustomRouter {
    constructor(){
        this.router = Router()
        this.init()
    }

    getRouter(){
        return this.router
    }

    init(){
        
    }

    get(path, ...cb) {
        this.get(path, this.applyCallbacks(cb))
    }

    post(path, ...cb) {
        this.post(path, this.applyCallbacks(cb))
    }

    applyCallbacks(cb){
        return cb.map(callback => async (...params) =>{
            try {
                await callback.apply(this, params)
            } catch (e) {
                return params[1].status(500).send(e)
            }
        })
    }
}