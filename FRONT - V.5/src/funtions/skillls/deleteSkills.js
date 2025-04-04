import axios from "axios";

async function deleteSkills(idSkill) {
            try {
                const response =  await axios.delete(`http://localhost:3000/skills/delete/${idSkill}`)
                .then(response => {
                  console.log('Response:', response.data);
                })
                .catch(error => {
                  console.error('Error:', error);
                });
            } catch (error) {
                console.error('Error al eliminar la habilidad:', error);
                throw error;
            }
        };


export default deleteSkills;