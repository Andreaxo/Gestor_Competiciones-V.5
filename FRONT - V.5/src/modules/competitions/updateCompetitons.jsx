import React, { useState, useEffect } from "react";
import useCompetitionssDataById from "../../funtions/competitions/getCompetitionById";
import updateCompetition from "../../funtions/competitions/updateCompetitions";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import DeleteCompetitions from "./deleteCompetitions";
import noImage from "../../../public/icons/noImg.png"
import './update.css';
import getImgFile from "../../funtions/img/getImgByFileName";


const UpdateCompetitions = ({ onClose }) => {
  /* //////////Variables necesarias y formatos/////////// */
  const id = localStorage.getItem("selectedUpdateCompetitionId");
  const competitionsData = useCompetitionssDataById(id);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().slice(0, 10);
  };

  /*  /////////////////////////////////////// */

  /* //Formulario con los datos //////// */
  const [formData, setFormData] = useState({
    competitionName: '',
    competitionDate: '',
    place: '',
    descripcion: '',
    competitorsAge: '',
    image: null
  });
  /* ////////////////////////////////////// */

  /* / Tomar los datos actuales de la competicion ////////////////// */
  useEffect(() => {
    const fetchDataWithDelay = async () => {
      if (competitionsData && competitionsData.length > 0) {
        setSelectedCompetition(competitionsData[0]);
      }
    };
    fetchDataWithDelay();

    const fetchImg = async () => {
      try {
        const imageFile = await getImgFile(competitionsData[0].image);
        console.log("Resultado de getImgFile:", competitionsData[0].image);
        if (imageFile) {
          setImage(imageFile); // Establece la imagen obtenida
        }
      } catch (error) {
        console.error("Error obteniendo la imagen:", error);
        console.log (selectedCompetition)
      }
    }
      ;
    fetchImg();


  }, [competitionsData]);

  useEffect(() => {
    
    const ejemplo= ()=>{
      console.log('ejemplo')
    }
    ejemplo();


    if (selectedCompetition) {
      setFormData({
        competitionName: selectedCompetition.name || "",
        competitionDate: formatDate(selectedCompetition.date) || "",
        place: selectedCompetition.place || "",
        descripcion: selectedCompetition.description || "",
        competitorsAge: selectedCompetition.age || "",
        image: selectedCompetition.image
      });
    }




  }, [selectedCompetition]);



  /*   //////////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */

  /* Captura los nuevos cambios y los introduce en el formata */
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  /* //////////////////////////////////////////////////////// */

  /* //Enviar los datos con el boton al back/////////// */
  const handleSubmit = async () => {

    if (formData.competitorsAge < 0 || formData.competitorsAge > 100) {
      alert("Hubo un error al crear la competencia", error);
    }
    else {
      try {
        await updateCompetition(
          id,
          formData.competitionName,
          formData.competitionDate,
          formData.place,
          formData.descripcion,
          formData.competitorsAge,
          formData.image
        );
        alert("Competencia modificada exitosamente");

        window.location.reload();
      } catch (error) {
        alert("Hubo un error al crear la competencia", error);
        console.error("Error al crear la competencia:", error);
      }
    };

  }
  /* ///////////////////////////////////////////////////////// */

  /* Manejador de la imagen    */
  const [image, setImage] = useState(noImage);
  /* const [ImageName, setImageName] = useState(''); */

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Obtener el primer archivo seleccionado
    if (file) {

      const { files } = e.target; // Capturamos el archivo seleccionado
      setFormData({
        ...formData,
        image: files[0] // Solo tomamos el primer archivo, ya que un campo de tipo "file" puede permitir múltiples archivos
      });

      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result); // Establecer la URL de la imagen en el estado
      };

      reader.readAsDataURL(file); // Leer la imagen como URL de datos
    }
  };

  /* Imagen */
  /* /////////////////////////////////////////////// */

  return (
    <div>
      {isModalDeleteOpen && (
        <DeleteCompetitions onClose={() => setIsModalDeleteOpen(false)} />
      )}

      <div className="create__flotant__window">
        <h2>Modificar competencia</h2>
        <div>
          <input
            type="text"
            required
            name="competitionName"
            value={formData.competitionName}
            onChange={handleInputChange}
          />
          <label>Nombre de la competencia</label>
        </div>

        <div>
          <input
            type="date"
            required
            name="competitionDate"
            value={formData.competitionDate}
            onChange={handleInputChange}
          />
          <label>Fecha de la competencia</label>
        </div>

        <div>
          <input
            type="text"
            required
            name="place"
            value={formData.place}
            onChange={handleInputChange}
          />
          <label>Lugar de la competencia</label>
        </div>


        <div className="create__flotant__window-image-box update__window__image">
          <img src={image} alt="Imagen de la competencia" />
        </div>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <div>
          <input
            type="number"
            required
            name="competitorsAge"
            value={formData.competitorsAge}
            onChange={handleInputChange}
          />
          <label>Edad máxima de la competencia</label>
        </div>

        <div>
          <textarea
            className="create__flotant__window-description"
            type="text"
            required
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
          />
          <label>Descripción de la competencia</label>
        </div>

        <div className="create__flotant__window-buttons-botton">
          <button onClick={handleSubmit}>
            <CiEdit className="competitions__box-edit-icon-popup" />
            Guardar
          </button>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={() => setIsModalDeleteOpen(true)}>
            <MdDeleteForever className="competitions__box-edit-delete-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCompetitions;
