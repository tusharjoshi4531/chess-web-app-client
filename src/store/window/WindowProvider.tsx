import React, { useEffect, useState } from "react";
import WindowContext from "./window-context";

interface IWindowProviderProps {
    children: React.ReactNode;
}

const WindowProvider: React.FC<IWindowProviderProps> = ({ children }) => {
    const [windowSize, setWindowSize] = useState([
        window.innerHeight,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    });

    return (
        <WindowContext.Provider
            value={{ innerHeight: windowSize[1], innerWidth: windowSize[0] }}
        >
            {children}
        </WindowContext.Provider>
    );
};

export default WindowProvider;
