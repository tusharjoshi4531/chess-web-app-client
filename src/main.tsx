import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./index.css";
import GameProvider from "./store/game/GameProvider";
import UserProvider from "./store/user/UserProvider";
import WindowProvider from "./store/window/WindowProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    // <React.StrictMode>
    <BrowserRouter>
        <WindowProvider>
            <UserProvider>
                <GameProvider>
                    <App />
                </GameProvider>
            </UserProvider>
        </WindowProvider>
    </BrowserRouter>
    // </React.StrictMode>
);
