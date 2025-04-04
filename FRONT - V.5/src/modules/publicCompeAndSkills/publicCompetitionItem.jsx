import React, { useState, useEffect } from "react";
import getImgFile from "../../funtions/img/getImgByFileName";
import "./showCompetitions.css";


function PublicCompetitionItem({ competition, onClick }) {
  const [imgStyle, setImgStyle] = useState({ backgroundColor: "white" });

  useEffect(() => {
    const fetchImg = async () => {
      const imageFile = await getImgFile(competition.image);
      setImgStyle({
        backgroundImage: imageFile ? `url(${imageFile})` : "none",
        backgroundColor: imageFile ? "transparent" : "gray",
        borderRadius:"1rem",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      });
    };

    fetchImg();
  }, [competition.image]);

 

  return (

    <div className="publicCompetitions__box-item">
      <div style={imgStyle} onClick={onClick}>
      </div>

        <p className="publicCompetitions__box-name">{competition.name}</p>
      

      <div className="publicCompetitions__box-description">
        <p >{competition.description}</p>
      </div>

<a className="publicCompetitions__box-button" href="">Descubre mas</a>
    </div>

  );
}

export default PublicCompetitionItem;
