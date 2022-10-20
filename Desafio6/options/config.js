const options = {
    mysql: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'ecommerce'
        }
    },
    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: "./DB/ecommerce.sqlite"
        },
        userNullAsDefault: true
    }
}
module.exports= {options}