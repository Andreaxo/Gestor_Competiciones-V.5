import { useState, useEffect } from "react";
import axios from "axios";


function useDocumentsByCompetitionId(idCompetition) {
  const [document, setDocument] = useState([]);

  useEffect(() => {
    const GetDocument = async () => {
      try {
        const respuesta = await axios.get(`http://localhost:3000/document/getByCompetitionID/${idCompetition}`);
 
        setDocument(
respuesta.data.map(document => ({
            id: document.idDocuments,
            fileName: document.fileName,
            documentName: document.documentName,
            description: document.description,
            uploadDate: document.uploadDate,
            competitionId: document.competitionId
          }))
        );
      } catch (error) {
        console.error('Error al obtener competiciónes:', error);
      }
    };

GetDocument();

  }, []);

  return document;
}

export default useDocumentsByCompetitionId;