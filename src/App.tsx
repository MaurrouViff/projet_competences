import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState, createContext } from "react";


import { Home } from "./pages/Home.tsx";

// Pages pour les RH
import { Rh } from "./pages/rh/rh.tsx";
import { Salarie } from "./pages/rh/params/Salarie.tsx";
import { Skills } from "./pages/rh/params/Skills.tsx";
import { Evaluations } from "./pages/rh/params/Evaluations.tsx";

// Pages pour les collaborateurs
import { Collaborateur } from "./pages/collaborateur/collaborateur.tsx";

import { SkillsCollaborateur } from "./pages/collaborateur/params/Skills.tsx";
import { EvaluationsCollaborateur } from "./pages/collaborateur/params/Evaluations.tsx";

// import pour le projet global

import supabase from "./lib/supabaseClient.ts";

export const UserContext = createContext(null);

function App() {

    const [authChecked, setAuthChecked] = useState(false);

    // Add state for user
    const [user, setUser] = useState(null);

    function getUser(userID) {
        supabase
            .from("salarie")
            .select("*")
            .eq("id", userID)
            .then((data) => {
                setUser(data.data[0]);
            });
    }

    // function getRole(id_role) {
    //   supabase
    //     .from("role")
    //     .select("*")
    //     .eq("id", id_role)
    //     .then((data) => {
    //       console.log(data.data[0].id);
    //     });
    // }

    useEffect(() => {
        async function checkAuth() {
            const { data } = await supabase.auth.getUser();

            const userID = data.user?.id;
            getUser(userID);
            setAuthChecked(true);
        }

        checkAuth();
    }, []);

    function renderRoutes() {
        if (!authChecked) {
            return null;
        }

        if (user?.role === 2) {
            // RH
            return (
                <Routes>
                    <Route path="/" element={<Rh />} />
                    <Route path="/rh" element={<Rh />} />
                    <Route path="/rh/salarie" element={<Salarie />} />
                    <Route path="/rh/skills" element={<Skills />} />
                    <Route path="/rh/evaluations" element={<Evaluations />} />
                    <Route path="/*" element={<Rh />} />
                </Routes>
            );
        } else if (user?.role === 1) {
            // Collaborateur
            return (
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/collaborateur" element={<Collaborateur />} />
                    <Route
                        path="/collaborateur/skills"
                        element={<SkillsCollaborateur />}
                    />
                    <Route
                        path="/collaborateur/eval"
                        element={<EvaluationsCollaborateur />}
                    />
                    <Route path="/*" element={<Collaborateur />} />
                </Routes>
            );
        } else {
            return (
                <Routes>
                    <Route path="/" element={<Home />} />

                </Routes>
            );
        }
    }

    return (
        <UserContext.Provider value={user}>
            <div className="App">{renderRoutes()}</div>
        </UserContext.Provider>
    );
}

export default App;
