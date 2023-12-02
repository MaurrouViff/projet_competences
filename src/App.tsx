import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

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

import { About } from "./pages/about.tsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  function getUser(userID) {
    supabase
      .from("salarie")
      .select("*")
      .eq("uuid", userID)
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data.data[0]));
        
      });
      
  }

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();
      setLoggedIn(!!data.user?.id);
      setAuthChecked(true);
      const userID = data.user?.id;
      getUser(userID);
    }

    checkAuth();
  }, []);

  // returns null until we know if the user is logged in or not
  if (!authChecked) {
    return null; // or a loading spinner
  }

  return (
    <>
      {loggedIn ? (
        <Routes>
          <Route path="/rh" element={<Rh />} />
          <Route path="/rh/salarie" element={<Salarie />} />
          <Route path="/rh/skills" element={<Skills />} />
          <Route path="/rh/evaluations" element={<Evaluations />} />
          <Route path="/collaborateur" element={<Collaborateur />} />
          <Route
            path="/collaborateur/skills"
            element={<SkillsCollaborateur />}
          />
          <Route
            path="/collaborateur/eval"
            element={<EvaluationsCollaborateur />}
          />
          <Route path="/about" element={<About />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      )}
    </>
  );
}

export default App;
