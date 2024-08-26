import { Router } from 'express'
import productManager from '../dao/mongo/ProductsManager.js'

const router = Router()

const viewsProductsRouter = (io) => {

	//Configuración de WebSocket
	io.on('connection', async (socket) => {
		const products = await productManager.getProducts();
		socket.emit('products', products);
	
		socket.on('addProduct', async (product) => {
			if (!product) return;
	
			const { title, description, code, price, status, stock, category, thumbnails } = product;
			
			try {
				await productManager.addProduct(title, description, code, price, status, stock, category, thumbnails);
				const updatedProducts = await productManager.getProducts();
				io.emit('products', updatedProducts);
			} catch (error) {
				console.error(`Error adding product: ${error}`);
			}
		});
	
		socket.on('deleteProduct', async (pid) => {
			if (!pid) return;
			const productId = pid.trim();
			if (!productId) return;
	
			try {
				await productManager.deleteProduct(productId);
				const updatedProducts = await productManager.getProducts();
				io.emit('products', updatedProducts);
			} catch (error) {
				console.error(`Error deleting product: ${error}`);
			}
		});
	
		socket.on('updateProduct', async (product) => {
			if (!product) return;
	
			const { pid, field, data } = product;
	
			try {
				await productManager.updateProduct(pid, field, data);
				const updatedProducts = await productManager.getProducts();
				io.emit('products', updatedProducts);
			} catch (error) {
				console.error(`Error updating product: ${error}`);
			}
		});
	});

	router.get('/products', async (req, res) => {
		try{
			const { limit, page, sort, query } = req.query

			const products = await productManager.getProducts(limit, page, sort, query)

			res.render('products/products', { products })
		} catch(error){
			res.render('errors/error', { error: error })
		}
	})

	router.get('/product/:pid', async (req, res) => {
		try{
			if(!req.params.pid) return

			const pid = req.params.pid
			const formatPid = pid.trim() 

			if(!formatPid) return 

			const product = await productManager.getProductById(formatPid)

			res.render('products/product', { product })
		} catch(error){
			res.render('errors/error', { error: error })
		}
	})
	
	router.get('/realtimeproducts', async (req, res) => {
		try{
			res.render('admin/realTimeProducts')
		} catch(error){
			res.render('errors/error', { error: error })
		}
	})

	return router
}
	
export default viewsProductsRouter