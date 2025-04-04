// Imports de framework y modulos MySQL
const express = require('express');
const router = express.Router();
const app = express();
const mysqlDB = require('../../db_connection/conexion.js');
const cors = require('cors');
app.use(cors());

//Imports de Variables
const {getbyIdSkill} = require('../../Routes/skillsRoutes.js');


//Get de competiciones por id//
router.get(getbyIdSkill, async (req, res) => {
    const idSkill=req.params.idSkill
  
    try {
        //Conectar a la base de datos 
        const conexion = await mysqlDB.conexionDB();

        //Consulta SQL
        const [filas] = await conexion.execute("SELECT * FROM skills where idSkills=?",[idSkill]);

        // Enviar los resultados
        res.send(filas)
    } catch (error) {
        //Enviar error en caso de falla
        res.status(500).send({
            mensaje: error.message,
            detalles: error.stack //detalles del error
        });
    }
});

module.exports = router



