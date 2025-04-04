import axios from "axios";

const getImgFile = async (fileName) => {
  try {
    // Configuración de la solicitud para descargar el archivo
    const response = await axios.get(`http://localhost:3000/getImg/${fileName}`, {
      responseType: 'blob' // Para manejar archivos binarios como imágenes
    });
    
    // Verificar si la respuesta tiene un tipo de imagen
    if (!response.headers['content-type'].startsWith('image')) {
      throw new Error('El archivo recibido no es una imagen');
    }

    // Almacenar el blob en una variable
    const imageBlob = response.data;

    // Crear un objeto URL para visualizar la imagen
    const imageUrl = window.URL.createObjectURL(imageBlob);

    // Asegurarte de que la URL es correcta y está generada
    

    return imageUrl; // Devuelve el objeto URL que puedes usar en una imagen <img> o similar.

  } catch (error) {
    console.error('Error descargando el archivo:', error.message || error);
  }
}

export default getImgFile;