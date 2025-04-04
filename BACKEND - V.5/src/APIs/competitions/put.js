// Imports de requerimientos
const express = require('express');
const router = express.Router();
const app = express();
const mysqlDB = require('../../db_connection/conexion.js');
const cors = require('cors');
const path = require('path');
app.use(express.json());
app.use(cors());
const multer = require('multer');

//Imports de rutas y Variables
const { updateCompetitions } = require('../../Routes/competitionsRoutes.js');
const aleatorio = Date.now();

// Configuración de almacenamiento de imágenes con multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../../public/assets/img/competitionsImg'));
    },
    filename: (req, file, cb) => {
        const reformImgName = aleatorio + file.originalname;
        cb(null, reformImgName); // Guarda el archivo con su nombre original
    },
});

const upload = multer({ storage });


// Update de competiciones
router.put(updateCompetitions, upload.single('image'), async (req, res) => {
    const id = req.params.idCompetition;

    try {
        const conexion = await mysqlDB.conexionDB();

        //Obtener los datos de la propiedad
        const { competitionName, competitionDate, place, imagenName, description, competitorsAge } = req.body;

        // Obtener el nombre del archivo de la imagen subido
        const image = req.file ? aleatorio + req.file.originalname : null;

        //Cambiar la nota en la tabla
        await conexion.execute("UPDATE competitions SET competitionName=?,competitionDate=?,place=?,imagenName=?,description=?,competitorsAge=? where idCompetitions=? ", [competitionName, competitionDate, place, image, description, competitorsAge, id]);

        res.send("Competicion modificada");
    } catch (error) {
        res.status(500).send(error);
    }
}
);

module.exports = router