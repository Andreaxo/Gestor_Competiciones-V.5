import React, { useState, useEffect } from "react";
import useCompetitionssData from "../../funtions/competitions/getCompetitions";
import { useNavigate } from "react-router-dom";
import PublicCompetitionItem from "./publicCompetitionItem";
import "./showCompetitions.css";
import PublicCompetitionDetail from "./publicCompeDetail";

function PublicShowCompetitions() {
  const competitions = useCompetitionssData();
  const navigate = useNavigate();
 const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);

  const navigateToSkill = (id) => {
    localStorage.setItem("selectedCompetitionId", id);
    setIsModalDetailOpen(true);
  };



  return (
    <div className="publicCompetitions__box">
      <div className="publicCompetitions__box-general">

      {isModalDetailOpen && <PublicCompetitionDetail onClose={() => setIsModalDetailOpen(false)} />}

        <div className="publicCompetitions__box-title">
          <h1>Competiciones</h1>
        </div>

        <div className="publicCompetitions__box-list">
          {competitions.map((competition) => (
            <PublicCompetitionItem
              key={competition.id}
              competition={competition}
              onClick={() => navigateToSkill(competition.id)}
            />
          ))}


        </div>
      </div>
    </div>
  );
}

export default PublicShowCompetitions;
