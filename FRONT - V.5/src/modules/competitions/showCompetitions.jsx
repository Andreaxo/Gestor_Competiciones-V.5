import React, { useState } from "react";
import useCompetitionssData from "../../funtions/competitions/getCompetitions";
import CreateCompetitions from "./createCompetitions";
import UpdateCompetitions from "./updateCompetitons";
import { useNavigate } from "react-router-dom";
import iconGes from '../../icons/logoTR.png';
import iconSena from '../../icons/senaLogo.png';
import CompetitionItem from "./competitionItem"; // El componente que creamos
import "./showCompetitions.css";

function ShowCompetitions() {
  const competitions = useCompetitionssData();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const navigate = useNavigate();

  const navigateToSkill = (id, name) => {
    localStorage.setItem("selectedCompetitionName", name);
    localStorage.setItem("selectedCompetitionId", id);
    navigate("/menu");
  };

  const navigateToUpdate = (event, id) => {
    event.stopPropagation();
    localStorage.setItem("selectedUpdateCompetitionId", id);
    setIsModalUpdateOpen(true);
  };

  return (
    <div className="competitions__box">
      <div className="competitions__box-general">
        <div className="competitions__box-icons">
          <div className="competitions__box-icons-list">
            <img src={iconGes} alt="Logo TR" />
          </div>
          <div className="competitions__box-icons-list">
            <img src={iconSena} alt="Logo Sena" />
          </div>
        </div>

        <div className="competitions__box-title">
          <h1>Competiciones</h1>
        </div>

        {isModalUpdateOpen && <UpdateCompetitions onClose={() => setIsModalUpdateOpen(false)} />}
        {isModalCreateOpen && <CreateCompetitions onClose={() => setIsModalCreateOpen(false)} />}

        <div className="competitions__box-list">
          {competitions.map((competition) => (
            <CompetitionItem
              key={competition.id}
              competition={competition}
              onClick={() => navigateToSkill(competition.id, competition.name)}
              onEdit={(event) => navigateToUpdate(event, competition.id)}
            />
          ))}

          <button className="competitions__box-button" onClick={() => setIsModalCreateOpen(true)}>
            Crear nueva competición
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowCompetitions;
