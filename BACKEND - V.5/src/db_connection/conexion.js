// Importar el paquete mysql2
const mysql = require('mysql2/promise');

// Configurar la conexion
const conexionDB = async() => {
    try {
        //Crear una conexion con la base MySQL
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'db_competiciones'
            
        })
        console.log("Conexión exitosa con MySQL");
        return connection;
    } catch (error) {
        console.error("Error al conectarse a la base de datos: ", error);
        return error;
    }
}

module.exports = { conexionDB }