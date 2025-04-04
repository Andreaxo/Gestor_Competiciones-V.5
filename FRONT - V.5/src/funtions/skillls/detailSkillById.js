import { useState, useEffect } from "react";
import axios from "axios";



function useSkillByIdsData(idSkill) {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const GetDatos = async () => {
      try {
        const respuesta = await axios.get(`http://localhost:3000/skills/byId/${idSkill}`);

        setSkills(
          respuesta.data.map(skill => ({
            id: skill.idSkills,
            name: skill.skillName,
            competitionName: skill.competitionName,
            idCompetition: skill.idCompetition,
            numberOfCompetitors: skill.numberOfCompetitors,
            description: skill.description,
          }))
        );
      } catch (error) {
        console.error('Error al obtener habilidade:', error);
      }
    };
      GetDatos();
  }, []);

  return skills;
}

export default useSkillByIdsData;