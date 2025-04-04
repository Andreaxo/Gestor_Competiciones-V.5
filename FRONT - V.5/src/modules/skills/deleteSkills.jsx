import React from "react";
import deleteSkills from "../../funtions/skillls/deleteSkills";
import './deleteSkills.css';


const DeleteSkills = ({ onClose }) => {

    const skillId = localStorage.getItem("selectedSkillId");

    const handleSubmit = async () => {
        try {
            await deleteSkills(skillId);
            onClose();
            window.location.reload();
            alert("Competencia eliminada exitosamenteeee");
        }
        catch (error) {
            console.error("Error al eliminar la competenciaaaaa:", error);
        }
    };

    return (
        <div className="deleteSkills__flotant__window">

            <div className="deleteSkills__flotant__window__box" ><h2>¿Esta seguro de eliminar esta habilidad?</h2>

                <div className="create__flotant__window-buttons-botton">
                    <button onClick={handleSubmit}>Eliminar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>

            </div>



        </div>
    );
};

export default DeleteSkills;
