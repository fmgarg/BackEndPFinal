const mongoose = require ('mongoose')
const modelProducto = require ('./models/productoEsquema')

CRUD()

async function CRUD (){

    try{
    const URL = 'mongodb://127.0.0.1:27017/ecommerce'
    let rta = await mongoose.connect (URL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
        })
        console.log('base de datos conectada')
    }catch (e){
        console.log(e)
    }
}