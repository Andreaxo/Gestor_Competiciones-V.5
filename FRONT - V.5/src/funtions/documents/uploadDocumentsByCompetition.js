import axios from "axios";

async function UseUploadDocumentByCompetition(idCompetition, nombre, descripcion, file) {
    try {
        // Crear un FormData para enviar los datos como formulario
        const formData = new FormData();
        formData.append('nombre', nombre); // agregar nombre al FormData
        formData.append('description', descripcion); // agregar descripción al FormData
        formData.append('pdf', file); // agregar archivo al FormData
        formData.append('idCompetition', idCompetition); // agregar idCompetition al FormData

        const response = await axios.post(
            `http://localhost:3000/document/uploadCompetitionPdf/${idCompetition}`,
            formData, // enviar formData
            {
                headers: {
                    'Content-Type': 'multipart/form-data' // asegurarse de enviar como multipart/form-data
                }
            }
        );

        return response.data;

    } catch (error) {
        console.error('Error al crear la competencia:', error);
        throw error;
    }
};

export default UseUploadDocumentByCompetition;