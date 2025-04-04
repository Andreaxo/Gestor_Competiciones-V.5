import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
/* Imporrt de paginas css */
import './styles/root.css';
import Menu from './modules/Menu';
import Home from './modules/Home';

/* import de los componetes */
import ShowSkills from './modules/skills/showSkills';
import ShowCompetitions from './modules/competitions/showCompetitions';
import DetailSkill from './modules/skills/detailsSkill';
import ExitSystem from './modules/menus/singOut';
import LogIn from './modules/LogIn/index';
import QuieroCompetir from './modules/QuieroCompetir/index';
import Competiciones from './modules/Competiciones/index';

/* Import componentes de usuarios */
import { ListadoExpertos } from "./components/expertos/ListadoExpertos";
import { ListadoAprendiz } from "./components/aprendiz/ListadoAprendiz";
import { ListadoCompetidor } from "./components/competidores/ListadoCompetidor";

import { useEffect } from 'react';

import PrivateRoute from './PrivateRoute.jsx';
import PublicRoute from './PublicRoute.jsx';

function App() {
  
  
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/Login"
        element={
          <PublicRoute>
            <LogIn />
          </PublicRoute>
        }
      />

      <Route path="/competiciones" element={<Competiciones />} />
      <Route path="/Inscribirse" element={<QuieroCompetir />} />

      <Route
        path="/menu"
        element={
          <PrivateRoute>
            <Menu />
          </PrivateRoute>
        }
      />

      <Route
        path="/habilidades"
        element={
          <PrivateRoute>
            <>
              <ExitSystem />
              <ShowSkills />
            </>
          </PrivateRoute>
        }
      />
      <Route
        path="/habilidadElegida"
        element={
          <PrivateRoute>
            <DetailSkill />
          </PrivateRoute>
        }
      />
      <Route
        path="/competencias"
        element={
          <PrivateRoute>
            <>
              <ExitSystem />
              <ShowCompetitions />
            </>
          </PrivateRoute>
        }
      />
      <Route
        path="/listadoExpertos"
        element={
          <PrivateRoute>
            <ListadoExpertos />
          </PrivateRoute>
        }
      />
      <Route
        path="/listadoAprendiz"
        element={
          <PrivateRoute>
            <ListadoAprendiz />
          </PrivateRoute>
        }
      />
      <Route
        path="/listadoCompetidores"
        element={
          <PrivateRoute>
            <ListadoCompetidor />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<div>Página no encontrada</div>} />
    </Routes>
  </Router>
  );
}

export default App


