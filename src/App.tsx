import './App.css'
import {Routes, Route} from "react-router-dom";

import {Home} from "./pages/Home.tsx";
import {Rh} from "./pages/rh/rh.tsx";
import {Collaborateur} from "./pages/collaborateur/collaborateur.tsx";
import {Salarie} from "./pages/rh/Salarie.tsx";
import {About} from "./pages/about.tsx";


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>

                <Route path="/rh" element={<Rh/>}/>
                <Route path="/rh/salarie" element={<Salarie/>}/>

                <Route path="/collaborateur" element={<Collaborateur/>}/>
                <Route path="/about" element={<About/>}/>


            </Routes>
        </>
    )
}
export default App
