import {Aside} from "../../components/Aside.tsx";
import React, {ReactNode} from "react";


interface RootLayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<RootLayoutProps> = ({children}) => {
    return (
        <html lang="fr">
        <body>
        <main style={{display: "flex", width: "100%"}}>
            <Aside/>
            {children}
        </main>
        </body>
        </html>
    );
};
