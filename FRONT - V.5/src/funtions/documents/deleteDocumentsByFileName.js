import axios from "axios";

async function deleteDocumentByFileName(fileName) {
            try {
                const response =  await axios.delete(`http://localhost:3000/document/delete/${fileName}`)
                .then(response => {
                  console.log('Response:', response.data);
                })
                .catch(error => {
                  console.error('Error:', error);
                });
            } catch (error) {
                console.error('Error al eliminar la competicion:', error);
                throw error;
            }
        };


export default deleteDocumentByFileName;