import '../../assets/css/aside.css'
import React, {ReactNode} from "react";
import {Link} from "react-router-dom";
import {LogOut, UserCircle2} from "lucide-react";
import supabase from "../../lib/supabaseClient.ts";


interface RootLayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<RootLayoutProps> = ({children}) => {
    // MANAGE LOGOUT SESSION
    const logOut = async () => {
        let { error } = await supabase.auth.signOut()
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        sessionStorage.removeItem("role");
        window.location.href = "/"
        if (error) {
            console.log(error)
        }
    }
    return (
        <html lang="fr">
        <body>
        <main style={{display: "flex", width: "100%"}}>
            <div className="aside">
                <div className="top">
                    <Link to="/rh">
                        <div className="link">
                            <img src="/oasis.png" alt="" style={{width: "50px"}}/>
                        </div>
                    </Link>
                    <Link to="/rh/salarie">
                        <div className="link">
                            <UserCircle2  size={40}/>
                        </div>
                    </Link>
                </div>


                <Link to="/" onClick={logOut}>
                    <div className="link">
                        <LogOut  size={40}/>
                    </div>
                </Link>

            </div>

            {children}
        </main>
        </body>
        </html>
    );
};
