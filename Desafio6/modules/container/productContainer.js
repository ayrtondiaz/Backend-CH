
const knex = require('knex')
const { options } = require('./options/config.js')

createDb()


module.exports = class Container {
    constructor(options, table) {
        this.knex = knex(options)
        this.table = table
    }

    async getAll() {
        try {
            return JSON.parse(JSON.stringify(await this.knex.from(this.table).select('*')));;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            return JSON.parse(JSON.stringify(await this.knex.from(this.table).select('*').where('id', '=', parseInt(id))))
        } catch (error) {
            console.log(error);
        }
    }

    async addProduct(productAdded) {
        try {
            return this.knex(this.table).insert(productAdded)
        } catch (error) {
            console.log(error)
        }
    }

    async editById(id, productEdited) {
        try {
            await this.knex.from(this.table).where('id', '=', id).update(productEdited)
            return {
                msj: "product edited"
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id) {
        try {
            await this.knex.from(this.table).where(id).del()
            return {
                msj: "product deleted"
            }
        } catch (error) {

        }
    }
}



function createDb() {  
    knex(options.mysql).schema.createTable('productos', tables => {
        tables.increments('id')
        tables.string('product')
        tables.string('value')
        tables.string('urlImg')
    }).then(() => {
        console.log("table created");
    }).catch((error) => {
        console.log(error); throw error;
    }).finally(() => {
        knex(options.sqlite).destroy()
    })

    knex(options.mysql).from('productos').insert(
        [
            {
                product: "CocoCola",
                value: 450,
                urlImg: "https://cdn1.iconfinder.com/data/icons/food-flat-1/48/50-128.png"
            },
            {
                product: "Pepsi",
                value: 450,
                urlImg: "https://cdn4.iconfinder.com/data/icons/soda_pop_caps/PNG/Pepsi-Classic_256.png"
            }
        ]
    ).then(() => {
        console.log("products added");
    }).catch((error) => {
        console.log(error); throw error;
    }).finally(() => {
        knex(options.sqlite).destroy()
    })
}
