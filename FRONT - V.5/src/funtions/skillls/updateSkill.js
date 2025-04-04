import axios from "axios";

async function updateSkill(idSkill,skillName,competitionName,numberOfCompetitors,description,idCompetition) {
            try {
                const response =  await axios.put(`http://localhost:3000/skills/update/${idSkill}`, {
                    skillName: skillName,
                    competitionName: competitionName,
                    numberOfCompetitors: numberOfCompetitors,
                    description: description,
                    idCompetition: idCompetition,
                })

                return response.data;

            } catch (error) {
                console.error('Error al crear la habilidad:', error);
                throw error;
            }
        };

export default updateSkill;


