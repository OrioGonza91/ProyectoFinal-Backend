import { Router } from "express";

const router = Router()

router.get('/login',(req, res) => {
    if(!req.signedCookies.currentUser){
        return  res.render('auth/login')
    }
    
    return res.redirect('/products')    
})

router.get('/register',(req, res) => {
    res.render('auth/register')
    console.log(res)
})

router.get('/products',(req, res) => {
    if(req.signedCookies.currentUser){
        return  res.render('products')
    }
    return res.redirect('/users/login')
})


export default router