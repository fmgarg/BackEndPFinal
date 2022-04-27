/*----------FIREBASE-----------

var admin = require("firebase-admin");

var serviceAccount = require ('./basenodejs-b6ec8-firebase-adminsdk-pleil-3ab9bdd6b3.json') ;
//const firebaseConfig = require ('./basenodejs-b6ec8-firebase-adminsdk-pleil-3ab9bdd6b3.json') 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://basenodejs-b6ec8-default-rtdb.firebaseio.com"
});
*/


//----------SERVIDOR CON EXPRESS--------

const express = require('express')

const app = express()
const PORT = 8080

app.use(express.static('public'))

const server = app.listen(PORT, () => {
  console.log('servidor levantado en el puerto: ' + server.address().port)
})

//iniciar el servidor con menejo de errores
server.on('error', (error) => console.log(`hubo un error ${error}`))

//metodo para enviar y recibir peticiones json
const router = express.Router()

//usar app delante de use hace que sea general y que toda la app pueda procesar JSON y siempre debe ir antes del router con la peticion**
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

/*-------------------------------------------------*/
/*------IMPORT DE MODULOS Y EXPONIENDO RUTAS-------*/
/*-------------------------------------------------*/

/*------------Memory-----------------------*/
const productosMm = require ('./DAOs/productosMm')
const carritoMm = require ('./DAOs/carritoMm')
app.use('/productos', productosMm)
app.use('/carrito', carritoMm)



/*------------FileSystem---------------------*/
const productosFS = require ('./DAOs/productosFS')
const carritoFS = require ('./DAOs/carritoFS')
app.use('/FS/productos', productosFS)
app.use('/FS/carrito', carritoFS)


/*------------FireBase-----------------------*/
const productosFB = require ('./DAOs/productosFB')
const carritoFB = require ('./DAOs/carritoFB')
app.use('/FB/productos', productosFB)
app.use('/FB/carrito', carritoFB)


/*------------Mongo-----------------------*/
const productosMg = require ('./DAOs/productosMg')
const carritoMg = require ('./DAOs/carritoMg')
app.use('/Mg/productos', productosMg)
app.use('/Mg/carrito', carritoMg)



/*-----Respuesta a rutas no implementadas-----*/

app.get('*', function(req, res){
  //res.sendFile(__dirname+’/public/error.html’);
  res.send('ruta no implementada')
  })