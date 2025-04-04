import './index.css';
import { MdOutlineDocumentScanner } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { FaTrophy } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { IoDocumentSharp } from "react-icons/io5";
import { BsCalendar2EventFill } from "react-icons/bs";
import { GrUserExpert } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import logoCompetencia from "../img/logo-worldskills.png";
import Inscritos from '../Inscritos';
import ShowCompetitionsDocuments from '../documents/showCompetitionsDocument';
import Documentos from '../Documentos';
import { Eventos } from '../../components/eventos/Eventos';
import { useState } from 'react';
import DocumentosPopUp from '../DocumentosPopUp';
import { ListadoCompetidor } from '../../components/competidores/ListadoCompetidor';
import { ListadoAprendiz } from '../../components/aprendiz/ListadoAprendiz';
import { ListadoExpertos } from '../../components/expertos/ListadoExpertos';
import ShowSkills from '../skills/showSkills';

function Menu() {
    let classButton;
    const [menu, setMenu] = useState('');
    const [activeButton, setActiveButton] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenPopUp, setIsOpenPopUp] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Documentos');
    const nameCompetition = localStorage.getItem("selectedCompetitionName");
    const handleMenu = (e, button) => {
        setMenu(e);
        setActiveButton(button);
    }

    const toggleDropdown = () => setIsOpen(!isOpen);
    const popUp = () => setIsOpenPopUp(!isOpenPopUp);

    const handleSelectOption = (value) => {
        setSelectedOption(value);
        setIsOpen(false);
    };
    function signOut(){
        localStorage.setItem('token', 'true');
    }
    return (
        <>
            <div id="menu__body--container">


                <DocumentosPopUp state={isOpenPopUp} />
                <div id='product__container' className={isOpenPopUp && 'product__container__popup' || 'product__container__popup--hidden'}>

                    <div id="menu__container">
                        <h1>{nameCompetition}</h1>
                        <div className='menu__container--menu'>
                            <button className={`container--menu--button ${activeButton === 'Inscritos' ? 'menu--button--active' : ''}`}
                                onClick={() => handleMenu(<Inscritos />, 'Inscritos')}><span><MdOutlineDocumentScanner /></span> <span>Inscritos</span></button>

                            <button className={`container--menu--button ${activeButton === 'Aspirantes' ? 'menu--button--active' : ''}`}
                                onClick={() => handleMenu(<ListadoAprendiz />, 'Aspirantes')}><span><FaPerson /></span> <span>Aspirantes</span></button>

                            <button className={`container--menu--button ${activeButton === 'Competidores' ? 'menu--button--active' : ''}`}
                                onClick={() => handleMenu(<ListadoCompetidor />, 'Competidores')}><span><FaTrophy /></span> <span>Competidores</span></button>

                            <button className={`container--menu--button ${activeButton === 'Habilidades' ? 'menu--button--active' : ''}`}
                                onClick={() => handleMenu(<ShowSkills />, classButton = 'Habilidades')}><span><FaStar /></span> <span>Habilidades</span></button>

                            <button className={`container--menu--button ${activeButton === 'Documentos' ? 'menu--button--active' : ''}`}
                                onClick={() => handleMenu(<ShowCompetitionsDocuments />, classButton = 'Documentos')}><span><FaStar /></span> <span>Documentos</span></button>


                            <button className={`container--menu--button ${activeButton === 'Eventos' ? 'menu--button--active' : ''}`}
                                onClick={() => handleMenu(<Eventos />, 'Eventos')}><span><BsCalendar2EventFill /></span> <span>Eventos</span></button>
                            <button className={`container--menu--button ${activeButton === 'Expertos' ? 'menu--button--active' : ''}`}
                                onClick={() => handleMenu(<ListadoExpertos />, 'Expertos')}><span><GrUserExpert /></span> <span>Expertos</span></button>

                        </div>
                        <img src={logoCompetencia} className='logoCompetencia' alt="logo de la competencia"/>
                    </div>
                    <div id='menu__product--container'>
                        {menu}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Menu;