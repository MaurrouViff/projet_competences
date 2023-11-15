import './App.css'
import {Routes, Route} from "react-router-dom";

import {Home} from "./pages/Home.tsx";
import {Rh} from "./pages/rh/rh.tsx";
import {Salarie} from "./pages/rh/params/Salarie.tsx";
import {Skills} from "./pages/rh/params/Skills.tsx";
import {Evaluations} from "./pages/rh/params/Evaluations.tsx";
// Pages pour les collaborateurs
import {Collaborateur} from "./pages/collaborateur/collaborateur.tsx";
import {About} from "./pages/about.tsx";
import { SkillsCollaborateur } from './pages/collaborateur/params/Skills.tsx';
import { EvaluationsCollaborateur } from './pages/collaborateur/params/Evaluations.tsx';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>

                <Route path="/rh" element={<Rh/>}/>
                <Route path="/rh/salarie" element={<Salarie/>}/>
                <Route path="/rh/skills" element={<Skills/>}/>
                <Route path="/rh/evaluations" element={<Evaluations/>}/>


                <Route path="/collaborateur" element={<Collaborateur/>}/>
                <Route path="/collaborateur/skills" element={<SkillsCollaborateur/>}/>
                <Route path="/collaborateur/eval" element={<EvaluationsCollaborateur/>}/>

                <Route path="/about" element={<About/>}/>


            </Routes>
        </>
    )
}

export default App
