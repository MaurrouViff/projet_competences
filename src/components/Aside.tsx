import './aside.css'
import {Link} from "react-router-dom";
import {LogOut, UserCircle2} from "lucide-react";

export function Aside(){
    return (
        <div className="aside">
           <div className="top">
               <Link to="/rh">
                   <div className="link">
                       <img src="/oasis.png" width={"50px"} alt=""/>
                   </div>
               </Link>
               <Link to="/rh/salarie">
                   <div className="link">
                       <UserCircle2  size={40}/>
                   </div>
               </Link>
           </div>

         


            <Link to="/">
                <div className="link">
                    <LogOut  size={40}/>
                </div>
            </Link>

            

        </div>

        
    )
}