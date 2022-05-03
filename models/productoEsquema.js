const mongoose = require ('mongoose')

const productosEsquema = new mongoose.Schema ({
                        id: {type: Number, require: true},
                        title: {type: String, require: true, max: 100},
                        price: {type: Number, require: true},
                        description: {type: String, require: true, max: 255},
                        category: {type: String, require: true, max: 100},
                        image: {type: String, require: true, max: 255},
                        stock: {type: Number, require: true}
})

module.exports = mongoose.model('productos', productosEsquema)
