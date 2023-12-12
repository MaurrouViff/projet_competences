import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import React from "react";

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

// import loading
import { BeatLoader } from "react-spinners";

export const UserContext = createContext(null);

function App() {
  const [authChecked, setAuthChecked] = useState(false);
  const [routes, setRoutes] = useState([]);

  // Add state for user
  const [user, setUser] = useState(null);

  const role = sessionStorage.getItem("role");

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

    async function getRoutes(id_role) {
      supabase
        .from("routes")
        .select("*")
        .eq("id_role", id_role)
        .then((data) => {
          setRoutes(data.data);
        });
    }

    getRoutes(role);

    checkAuth();
  }, []);

  const componentMap = {
    Home,
    Rh,
    Salarie,
    Skills,
    Evaluations,
    Collaborateur,
    SkillsCollaborateur,
    EvaluationsCollaborateur,
  };

  function renderRoutes() {
    if (routes && routes.length > 0) {
      return routes.map((route) => {
        const Component = componentMap[route.element];

        if (!Component) {
          throw new Error(
            `A component was not found for the element ${route.element}`
          );
        }

        return (
          <Route key={route.id} path={route.path} element={<Component />} />
        );
      });
    } else {
      return <Route path="/" element={<Home />} />;
    }
  }
  if (!user || !routes) {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "white",
                    overflowY: "hidden",
            
          }}
        >
          <img src="/OASIS-logo.jpg" width={"10%"} alt="" />
        </div>
  
      </>
    );
  }
  return (
    <UserContext.Provider value={user}>
      <Routes>{renderRoutes()}</Routes>
    </UserContext.Provider>
  );
}

export default App;
