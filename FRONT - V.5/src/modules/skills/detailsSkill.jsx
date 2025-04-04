import React from "react";
import useSkillByIdsData from "../../funtions/skillls/detailSkillById"; // Asegúrate de importar correctamente
import './detailsSkills.css';
import { FaPerson } from "react-icons/fa6";



function DetailSkill({ onClose }) {
    const skillId = localStorage.getItem("selectedSkillId");
    const skills = useSkillByIdsData(skillId);
    return (
        <div className="details__window__flotant">
            <div className="details__window__flotant-box">
                <div className="details__window__flotant-titles">
                    <h1>Detalles de la habilidad</h1>
                    <a onClick={onClose}> {"<"} Volver atras </a>
                </div>


                <div>
                    {skills.map((skill) => (
                        <div className="details__window__flotant-item" key={skill.id}>
                            <div></div>
                            <div><h2>{skill.name}</h2></div>
                            <div><p>{skill.description}</p></div>
                            <div className="details__window__flotant-participants"><FaPerson />{skill.numberOfCompetitors}</div>


                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
}

export default DetailSkill;