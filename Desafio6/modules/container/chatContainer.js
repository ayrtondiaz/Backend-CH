const { options } = require('./options/config.js')
const knex = require('knex')(options.sqlite)

createDb()

module.exports = class Chat {
    constructor(table) {
        this.table = table
    }
    async getMsj() {
        try {
            return JSON.parse(JSON.stringify(await knex.from(this.table).select('*')));;
        } catch (error) {
            console.log(error);
        }
    }

    async addMsj(newMsj) {
        try {
            return await knex.from(this.table).insert(newMsj)
        } catch (error) {
            console.log(error);
        }
    }
}

function createDb() {
    knex.schema.createTable('chat', tables => {
        tables.increments('id')
        tables.string('name')
        tables.string('message')
        tables.string('date')
    }).then(() => {
        const WelcomeMessage =
        {
            "name": "Servidor",
            "message": "Deje su mensaje a continuación",
            "date": "8/10/2022, 03:47:37"
        }


        knex.from('chat').insert(WelcomeMessage)
            .then(() => {
                console.log("Welcome msj added");
            }).catch((err) => {
                console.log(error);
            }).finally(() => {
                knex.destroy()
            });
        console.log("table created");
    }).catch((error) => {
        console.log(error); throw error;
    }).finally(() => {
        knex.destroy()
    })
}
