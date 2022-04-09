const express = require ('express')
const req = require('express/lib/request')

const carritoRouter = express.Router ()

const fs = require('fs');

const nombreArchivo = 'carrito.json'

let productosNotParse = fs.readFileSync('./carrito.json', 'utf-8')
//console.log(productosNotParse)
let productos = JSON.parse(productosNotParse)
//console.log(productos)


const newObjeto = {
    "title":"Pez Globo",                                                                                                                          
    "price": 345.67,                                                                                                                                     
    "thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"                                   
}

class Contenedor {
       
    constructor ( productos, newObjeto){
        this.listaProductos = productos
        this.objeto = newObjeto
        };

    async getAll() {
            try {

                if (this.listaProductos !== []) {
                    //console.log(productosParse)
                    return productos;
                } else {
                    throw 'no hay productos para mostrar'
                }

            } catch (error) {
                console.log(`Error: ${error}`);
            }
        }

    async save(cart, producto, cartId) {
        try {
            
            let carritoExiste = await items.getByID (cartId)

            //console.log(carritoExiste)

            if (carritoExiste.length === 0){
                cart ["elem"] = producto
                //console.log(cart)
                productos.push(cart)
                console.log(`el nuevo carrito tiene el id ${cartId}`)
                
                await fs.writeFile('./carrito.json', JSON.stringify(productos, null, 4), error =>{
                        if(error){
                        } else {
                        console.log("se guardo un nuevo producto.")
                        }
                })
            }else {                
                //console.log('hay que agregar')
                //carritoExiste.push(producto)
                //console.log(carritoExiste)

                const cartPut = await items.getByID (cartId)
                cartPut.push (producto)
                //console.log(cartPut)
                console.log(cartPut)
                

                const index = productos.findIndex(item => item.cartId === cartId)
                //console.log(index)
                productos.splice (index, 1,cartPut )
                console.log(productos)
                
                
                await fs.writeFile('./carrito.json', JSON.stringify(productos, null, 4), error =>{
                    if(error){
                    } else {
                    console.log("se agrego un producto a su carrito")
                    }
                })
                
            }                                                                        
        }
        catch (err) {
            console.log('no se pudo agregar');
        }
    }

    async getByID(ID) {
        try {
            let products = await items.getAll()
            //console.log(products)
            let buscarProductoXId = products.filter(elem => elem.cartId == ID);
            //console.log(buscarProductoXId)
            if (buscarProductoXId == null){                
                console.log('el producto no existe');
            }else{
                //console.log(buscarProductoXId);
                return (buscarProductoXId)
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    async deleteByID(ID) {
        try {
            let products = await items.getAll()
            //console.log(products)
            const eliminado = products.filter ((item) => item.id == ID);
            //console.log(eliminado)
            if (eliminado.length === 0) { 
                console.log('el producto no existe')
            }else{
                const resultado = productos.filter ((item) => item.id !== ID)
                       // console.log('producto eliminado')
                        const producto = await items.getByID (ID)
                        const index = products.indexOf(producto)
                        productos.splice (index, 1)

                        fs.writeFile('./carrito.json', JSON.stringify(productos, null, 4), error =>{
                            if(error){
                            } else {
                            console.log("se elimino un producto.")
                            }
                         })
                 return resultado
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    async putByID(ID, newPrice) {
        try {
            let products = await items.getAll()
            //console.log(products)
            const encontrado = products.filter ((item) => item.id == ID);
            //console.log(encontrado)
            if (encontrado.length === 0) { 
                console.log('el producto no existe')
            }else{
                const respuesta = {}
                //console.log(respuesta)
                respuesta.anterior = encontrado
                //console.log(respuesta.anterior)
                
                //const indexElem = encontrado.findIndex(elem => elem === "price")
                //console.log (indexElem)
                let newProp = newPrice['price']
                //console.log(newProp)

                respuesta.actualizada = newPrice
                //console.log(respuesta.actualizada)

                const producto = await items.getByID (ID)
                const indexObjeto = products.indexOf(producto)
                productos.splice(indexObjeto, 1, newPrice)
                return respuesta




                /*const resultado = productos.filter ((item) => item.id !== ID)
                       // console.log('producto eliminado')
                        const producto = await items.getByID (ID)
                        const index = products.indexOf(producto)
                        productos.splice (index, 1)
                 return resultado
                 */
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    async deleteAll() { 
        this.listaProductos = [];
        await fs.writeFile('./carrito.json', JSON.stringify(this.listaProductos, null, 4), error =>{
            if(error){
            } else {
            console.log("Se eliminaron todos los productos del contenedor.")
            }
        });
        
    }

}

const items = new Contenedor ('carrito.json');


//---------------------------------------------------------creacion de las rutas--------------------------------------------------------------------------

//esta ruta lista todos los carritos PTO0
carritoRouter.get ('/', async (req, res)=>{
    let products = await items.getAll()
    res.json(products)
})

// PTO "A" es para crear un carrito crear el cartId y timeStamp
carritoRouter.post('/', async (req, res)=>{
  //console.log(req.body)

  cartId = JSON.parse(req.query.user)
  //cartID = 28888888 
  //console.log(req.query)

  let cart = new Object()
  cart ["cartId"] = cartId

  let newProduct = await items.save (cart, req.body, cartId)
  //productos.push(req.body)
  res.json({mensaje: 'Se creo un carrito'})
})

/*
// PTO "B" vacia un carrito y lo elimina por idCart
carritoRouter.delete ("/:ID", async (req, res)=>{
    number = JSON.parse(req.params.ID)
    //console.log(number)
    let products = await items.deleteByID(number)
    //console.log(product)
    res.json(products)
})
*/

// PTO "C" esta ruta lista todos los productos de un id de carrito  
carritoRouter.get ('/:cartId/productos', async (req, res)=>{
    number = JSON.parse(req.params.cartId)
    //console.log(number)
    let product = await items.getByID(number)
    res.json(product)
})

// PTO "D" aca la ruta a implementar es :ID/productos Es para agregar productos al carrito por su ID de producto
carritoRouter.put ('/:ID', async (req, res)=>{
    //console.log(req.body)
    let newPrice = req.body
    //number = JSON.parse(req.params.ID)
    //console.log(number)
    let putProduct = await items.putByID(req.params.ID, newPrice)
    res.json(putProduct)
})

// PTO "E" aca la ruta a implementar es :ID/productos/:id_prod  Elimina un producto por idCart & ID de producto
carritoRouter.delete ("/:ID", async (req, res)=>{
    number = JSON.parse(req.params.ID)
    //console.log(number)
    let products = await items.deleteByID(number)
    //console.log(product)
    res.json(products)
})

//exportando el modulo
module.exports = carritoRouter