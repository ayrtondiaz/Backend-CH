import knex from "knex"
import config from"../src/config/configDb.js"

const sqliteClient = knex(config.sqlite3);

(async function() { try {
    await sqliteClient.schema.createTable('Products', table => {
        table.increments('id'); 
        table.string('nombre'); 
        table.integer('precio');
        table.string('urlImagen');
    });

    console.log('Tabla de sqlite3 creada');

} catch (error) {
    console.log(`Error en tabla slite3 \n ${error} `);
} finally {
    sqliteClient.destroy()
}})()

(async function() { try {
    await sqliteClient.schema.createTable('cart', table => {
        table.increments('id'); 
        table.foreign('product_id');
    });

    console.log('Tabla de sqlite3 creada');

} catch (error) {
    console.log(`Error en tabla slite3 \n ${error} `);
} finally {
    sqliteClient.destroy()
}})()