import './App.css'
import {Routes, Route} from "react-router-dom";
import {useEffect, useState} from "react";


import {Home} from "./pages/Home.tsx";


// Pages pour les RH
import {Rh} from "./pages/rh/rh.tsx";
import {Salarie} from "./pages/rh/params/Salarie.tsx";
import {Skills} from "./pages/rh/params/Skills.tsx";
import {Evaluations} from "./pages/rh/params/Evaluations.tsx";

// Pages pour les collaborateurs
import {Collaborateur} from "./pages/collaborateur/collaborateur.tsx";


import {SkillsCollaborateur} from './pages/collaborateur/params/Skills.tsx';
import {EvaluationsCollaborateur} from './pages/collaborateur/params/Evaluations.tsx';

// import pour le projet global

import supabase from "./lib/supabaseClient.ts";


import {About} from "./pages/about.tsx";



function App() {
    const [userId, setUserId] = useState()

    useEffect(() => {
        async function getSession() {
            const {data, error} = await supabase.auth.getSession()
            if (error) {
                console.log(error);
            }
            console.log(data)

            setUserId(data.session.user.id)

        }

        getSession()
    }, []);

    if (userId) {
        async function test() {
            let {data: salarie, error} = await supabase
                .from('salarie')
                .select('*')
            if (error) {
                throw error;
            }
            const selectSalarie = salarie?.find(salarieUUID => salarieUUID.uuid === userId)
            console.log(selectSalarie)
        }

        test()
    }

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
