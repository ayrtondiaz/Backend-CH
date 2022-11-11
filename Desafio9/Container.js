
const knex = require('knex')
const { options } = require('./options/connectOptions')

// createDb()


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
                product: "Manzanas",
                value: 450,
                urlImg: "https://elegifruta.com.ar/onepage/wp-content/uploads/2017/07/manzana_roja.jpg"
            },
            {
                product: "Peras",
                value: 450,
                urlImg: "https://perfumesyfragancias.online/wp-content/uploads/2018/10/poire.jpg"
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