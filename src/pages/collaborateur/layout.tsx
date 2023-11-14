import '../../assets/css/aside.css'
import React, {ReactNode} from "react";
import {Link} from "react-router-dom";
import {LogOut, UserCircle2} from "lucide-react";


interface RootLayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<RootLayoutProps> = ({children}) => {
    return (
        <html lang="fr">
        <body>
        <main style={{display: "flex", width: "100%"}}>
            <div className="aside">
                <div className="top">
                    <Link to="/collaborateur">
                        <div className="link">
                            <img src="/oasis.png" alt="" style={{width: "80px"}}/>
                        </div>
                    </Link>
                    <Link to="/collaborateur/eval">
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

            {children}
        </main>
        </body>
        </html>
    );
};
