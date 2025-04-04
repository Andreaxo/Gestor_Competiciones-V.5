import React, { useState } from "react";
import useSkillsData from "../../funtions/skillls/getSkills"; // Asegúrate de importar correctamente
import { useNavigate } from "react-router-dom";
import CreateSkills from "./createSkills";
import UpdateSkills from "./updateSkills";
import { CiEdit } from "react-icons/ci";
import { FaPerson } from "react-icons/fa6";
import './skills.css'
import DetailSkill from "./detailsSkill";

function ShowSkills() {
    const id = localStorage.getItem("selectedCompetitionId");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
    const skills = useSkillsData(id); //hook con toda la data del parametro (id competicion)


    const navigateToSkillById = (skillId) => {
        localStorage.setItem("selectedSkillId", skillId);
        setIsModalDetailsOpen(true)
    };

    const openEdit = (event, skillId) => {
        event.stopPropagation();
        localStorage.setItem("selectedSkillId", skillId);
        setIsModalUpdateOpen(true);
    }




    return (
        <div className="Skills__box-general">


            <div className="skills__box-general-header">

                <div className="skills__box-general-titles"><h1>Habilidades</h1>
                    <h2>Escoge una habilidad</h2></div>


                <div className="skills__box-general_container-button"><button className="skills__box-button" onClick={() => setIsModalOpen(true)}>Crear habilidad</button></div>

            </div>



            {/* condicion para el create solo si isModalOpen es true */}
            {isModalOpen && <CreateSkills onClose={() => setIsModalOpen(false)} />}

            {/* condicion para el create solo si isModalOpen es true */}
            {isModalUpdateOpen && <UpdateSkills onClose={() => setIsModalUpdateOpen(false)} />}

            {/* condicion para el create solo si isModalOpen es true */}
            {isModalDetailsOpen && <DetailSkill onClose={() => setIsModalDetailsOpen(false)} />}




            <div className="skills__box-list">
                {skills.map((skill) => (
                    <div key={skill.id} className="skills__box-item" onClick={() => navigateToSkillById(skill.id)}>
                        <div></div>
                        <div><h3>{skill.name}</h3></div>

                        <div className="skills__box-item-info" >

                            <div className="skills__box-item-info-box">
                                <FaPerson />{skill.numberOfCompetitors}
                                </div>
                            


                            <button className="skills__box-item-icon" > <CiEdit className="competitions__box-edit-icon" /><p onClick={(event) => openEdit(event, skill.id)} className="competitions__box-edit-title">Modificar</p></button>
                        </div>



                    </div>

                ))}




            </div>
        </div>
    );
}

export default ShowSkills;

