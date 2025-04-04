import axios from "axios";


const downloadFile = async (fileName) => {
    try {
      // Configuración de la solicitud para descargar el archivo
      const response = await axios.get(`http://localhost:3000/document/download/${fileName}`, {
        responseType: 'blob' // Para manejar archivos binarios como PDF
      });
      
      // Crear un enlace temporal para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); // Nombre del archivo a descargar
      document.body.appendChild(link);
      link.click();

      // Limpiar el objeto URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error descargando el archivo:', error);
      console.log(documents)
    }
  };

  export default downloadFile;