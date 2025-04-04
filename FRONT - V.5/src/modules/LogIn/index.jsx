import './index.css';
import worldSkillsInternacional from '../img/discovermore-slider-1.jpg'
import figure1 from '../img/figure2.png'
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';

function LogIn(){

    const navigate = useNavigate();
    const navigateToComp = () => {
      navigate("/elegirCompeticion"); 
  };

  const [formData, setFormData] = useState({
    email: "",
    documentNumber: ""
});


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("http://localhost:3000/api/login/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          });
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          
          const data = await response.json();

          if (data.success) {
            localStorage.setItem('token', 'true');
            window.location.href = '/competencias'; 
          } else {
            console.log('Datos incorrectos');
          }
          console.log("Datos enviados: ", data);
        } catch (error) {
          console.error("Error al enviar los datos: ", error);
        }
      };

    const backHome = "< Volver al Home";
    return(
        <>
        <div className='container-login'>
            <div className='login__container'>
                <img src={figure1} className="login__container--figure1" alt="imagen de figura decorativa" />
                <img src={figure1} className="login__container--figure2" alt="imagen de figura decorativa" />
                <div className='login__container--login'>
                    <a onClick={()=> navigate("/")} id="login__backhome">{backHome}</a>
                    <h1 className='login__h1'>Ingresar al Sistema</h1>
                    <form className="login__form" onSubmit={handleSubmit}>
                      <div className='login__container--labelsubcontainer standard-input-container'>
                          <label htmlFor="#">Correo electrónico</label>
                          <input type="text"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className='login__container-userinput standard-input'/>
                      </div>
                      <div className='login__container--labelsubcontainer'>
                          <label htmlFor="#">Contraseña</label>
                          <input 
                          type="password"
                          name="documentNumber"
                          value={formData.documentNumber}
                          onChange={handleChange}
                          className='login__container-passwordinput' />
                      </div>
                    <div className='login__container-checkbox'><input type="checkbox" id='remember_me' name='_remember_me' /><label for="remember_me">Recuérdame</label></div>
                    <button className='login__container-submit btn1' type='submit'>Ingresar</button>
                    </form>
                </div>
                <div className='login__container--img'>
                    <img src={worldSkillsInternacional} alt="Imagen de referencia de WorldSkills Internacional" />
                </div>
            </div>
        </div>
        </>
    );
}


export default LogIn;
