import './App.css'
import {Routes, Route} from "react-router-dom";

import {Home} from "./pages/Home.tsx";
import {Rh} from "./pages/rh.tsx";
import {Collaborateur} from "./pages/collaborateur.tsx";


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/rh" element={<Rh/>}/>
                <Route path="/collaborateur" element={<Collaborateur/>}/>
            </Routes>
        </>
    )
}

export default App