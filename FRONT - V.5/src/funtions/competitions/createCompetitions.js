import axios from "axios";

async function createCompetition(competitionName,competitionDate,place,descripcion,competitorsAge,image) {
            try {

                const formData = new FormData();
                formData.append('competitionName', competitionName);
                formData.append('competitionDate', competitionDate); 
                formData.append('place', place); 
                formData.append('description', descripcion); 
                formData.append('competitorsAge', competitorsAge); 
                formData.append('image', image); 


                const response =  await axios.post(`http://localhost:3000/competitions/create`,formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data' // asegurarse de enviar como multipart/form-data
                    }
                })

                return response.data;

            } catch (error) {
                console.error('Error al crear la competicion:', error);
                throw error;
            }
        };



export default createCompetition;