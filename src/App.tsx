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
import { SaladIcon } from "lucide-react";

export const UserContext = createContext(null);

function App() {
  const [authChecked, setAuthChecked] = useState(false);
  const [routes, setRoutes] = useState([]);

  // Add state for user
  const [user, setUser] = useState(false);

  async function getRole(user) {
    const { data, error } = await supabase
      .from("salarie")
      .select("role")
      .eq("id", user.id);

    if (error) {
      console.error("Error fetching role:", error);
      return null;
    } else {
      return data[0].role;
    }
  }

  useEffect(() => {
    if (user) {
      getRole(user);
    } else {
      setRoutes([]);
    }
  }, [user]);

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

    if (sessionStorage.getItem("token")) {
    } else {
      setAuthChecked(true);
    }
    checkAuth();
  }, []);

  async function getRoutes(role) {
    const { data, error } = await supabase
      .from("routes")
      .select("*")
      .eq("id_role", role);

    if (error) {
      console.error("Error fetching routes:", error);
    } else {
      setRoutes(data);
    }
  }

  useEffect(() => {
    async function loadRoutes() {
      if (user) {
        const role = await getRole(user);
        if (role) {
          getRoutes(role);
        }
      }
    }

    loadRoutes();
  }, [user]);

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
    console.log(routes);
    if (routes && routes.length > 0) {
      return routes.map((route) => {
        const Component = componentMap[route.element];

        if (!Component) {
          throw new Error(
            `A component was not found for the element ${route.element}`
          );
        }

        console.log(route);
        return (
          <Route key={route.id} path={route.path} element={<Component />} />
        );
      });
    } else {
      return <Route path="/" element={<Home />}></Route>;
    }
  }

  return (
    <UserContext.Provider value={user}>
      <Routes>
    
        {renderRoutes()}</Routes>
    </UserContext.Provider>
  );
}

export default App;
