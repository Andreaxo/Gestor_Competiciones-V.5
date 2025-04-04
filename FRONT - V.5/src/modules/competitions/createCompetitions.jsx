import React, { useState } from "react";
import createCompetition from "../../funtions/competitions/createCompetitions";
import './create.css';
import noImage from "../../../public/icons/noImg.png"


const CreateCompetitions = ({ onClose }) => {

    const [formData, setFormData] = useState({
        competitionName: '',
        competitionDate: '',
        place: '',
        descripcion: '',
        competitorsAge: '',
        image:null
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async () => {
        
if(formData.competitorsAge<0 || formData.competitorsAge>100){
    alert("Hubo un error al crear la competencia", error);
}
else{
    try {
        await createCompetition(
            formData.competitionName,
            formData.competitionDate,
            formData.place,
            formData.descripcion,
            formData.competitorsAge,
            formData.image
        );
        alert("Competencia creada exitosamente");

        window.location.reload();
    } catch (error) {
        alert("Hubo un error al crear la competencia", error);
        console.error("Error al crear la competencia:", error);
    }
};

}

        

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

/* /////////////////////////////////////////////// */




    return (
        <div className="create__flotant__window">

            
                <h2>Crear nueva competición</h2>

                <div>
                <input type="text" required name="competitionName" value={formData.competitionName} onChange={handleInputChange} />
                    <label>Nombre de la competencia</label>
                    
                </div>

                <div>
                    
                    <input type="date" required name="competitionDate" value={formData.competitionDate} onChange={handleInputChange} min={new Date().toISOString().split("T")[0]} />
                    <label>Fecha de la competencia</label>
                </div>

                <div>
                    
                    <input type="text" required name="place" value={formData.place} onChange={handleInputChange} />
                    <label>Lugar de la competencia</label>
                </div>

                
                    <div className="create__flotant__window-image-box">
                    <img src={image}  alt="Imagen no encontrada" style={{ width: '300px', height: 'auto' }} />
                    
                    </div>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                

                <div>
                    
                    <input type="number" required name="competitorsAge" value={formData.competitorsAge} onChange={handleInputChange} min={14} max={100}/>
                    <label>Edad máxima de la competencia</label>
                </div>

                <div>

                    
                    <textarea className="create__flotant__window-description" type="text" required name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
                    <label>Descripción de la competencia</label>
                </div>

                
            

            <div className="create__flotant__window-buttons-botton"><button onClick={handleSubmit}>Crear</button><button onClick={onClose}>Cancelar</button></div>
        </div>
    );
};

export default CreateCompetitions;










