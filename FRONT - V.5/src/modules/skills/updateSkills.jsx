import React, { useState, useEffect } from "react";
import useSkillByIdsData from "../../funtions/skillls/detailSkillById";
import './createSkills.css';
import updateSkill from "../../funtions/skillls/updateSkill";
import DeleteSkills from "./deleteSkills";
import { MdDeleteForever } from "react-icons/md";


const UpdateSkills = ({ onClose }) => {
    const name = localStorage.getItem("selectedCompetitionName");
    const id = localStorage.getItem("selectedCompetitionId");
    const skillId = localStorage.getItem("selectedSkillId");
    const skills = useSkillByIdsData(skillId);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    console.log(skills, skillId)

    const [formData, setFormData] = useState({

        skillName: '',
        competitionName: name,
        numberOfCompetitors: '',
        description: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        if (skills?.[0]) {
            setFormData({
                skillName: skills[0].name,
                numberOfCompetitors: skills[0].numberOfCompetitors,
                description: skills[0].description
            });
        }
    }, [skills, name]);



    const handleSubmit = async () => {
        console.log(skillId,
            formData.skillName,
            name,
            FormData.numberOfCompetitors,
            formData.description,
            id)
        try {
            await updateSkill(
                skillId,
                formData.skillName,
                name,
                formData.numberOfCompetitors,
                formData.description,
                id
            )
                ;

            alert("Habilidad modificada exitosamente");
            window.location.reload();
        } catch (error) {
            alert("Hubo un error al modificar la Habilidad");
            console.error("Error al modificar la Habilidad:", error);
        }
    };

    return (


        <div className="create__flotant__window-skills">

            {isModalDeleteOpen && (
                <DeleteSkills onClose={() => setIsModalDeleteOpen(false)} />
            )}

            <div className="create__flotant__window_tittles-skills">
                <h2>Modificar habilidad</h2>
                <a onClick={onClose}> {"<"} Volver atras </a>
            </div>

            <div className="create__flotant__window-skills-container">

                <div className="create__flotant__window-skills-container-name">

                    <div className="create__flotant__window-skills-container-inputs">

                        <input type="text" placeholder="Ej. Desarrollo integral" name="skillName" value={formData.skillName} onChange={handleInputChange} />
                        <label>Nombre de habilidad</label>
                    </div>
                    <div className="create__flotant__window-skills-container-inputs">

                        <input type="number" placeholder="Ej. 2" name="numberOfCompetitors" value={formData.numberOfCompetitors} onChange={handleInputChange} min={1} max={5} />
                        <label>Numero de competidores</label>
                    </div>

                </div>




                <div className="create__flotant__window-skills-description-box">
                    <textarea type="text" name="description" placeholder="Escribe una breve descripcion acerca de la habilidad" className="create__flotant__window-skills-description" value={formData.description} onChange={handleInputChange} />
                    <label>Descripción de la competencia</label>
                </div>





                <div className="create__flotant__window-skills-botton">
                    <div>

                    </div>
                    <div className="create__flotant__window-skills-botton-buttons">
                        <button className="create__flotant__window-skills-botton-buttons-delete" onClick={() => setIsModalDeleteOpen(true)}>
                            <MdDeleteForever className="competitions__box-edit-delete-icon" />
                        </button>
                        <button onClick={handleSubmit}> Modificar habilidad

                        </button>
                    </div>
                </div>


            </div>


        </div>
    );
};

export default UpdateSkills;










